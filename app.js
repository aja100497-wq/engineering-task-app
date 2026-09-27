'use strict';
// 서버 없이 실행되는 학습용 앱. 사용자 입력은 textContent로 표시합니다.
const KEY = 'engineering-task-board-v1';
const STATES = ['대기', '진행 중', '완료'];
const $ = id => document.getElementById(id);
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
function validDate(s) { if(typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false; const d = new Date(s+'T12:00:00Z'); return !isNaN(d) && d.toISOString().slice(0,10)===s; }
function validTasks(data) { return Array.isArray(data) && data.length<=10000 && data.every(t => t && ['project','title','owner'].every(k => typeof t[k]==='string' && t[k].trim().length>0 && t[k].length<=200) && typeof t.id==='string' && t.id.length>0 && t.id.length<=100 && STATES.includes(t.status) && validDate(t.due)) && new Set(data.map(t=>t.id)).size===data.length; }
let tasks = [];
try {
  const raw = localStorage.getItem(KEY);
  if(raw !== null) { tasks = JSON.parse(raw); if(!validTasks(tasks)) throw new Error('invalid'); }
  else tasks = [
    {id:uid(),project:'ATS Demo',title:'고객 승인도 검토',owner:'김설계',due:today(),status:'진행 중'},
    {id:uid(),project:'Clamp Demo',title:'클램프 토크 시험 계획',owner:'이시험',due:today(),status:'대기'},
    {id:uid(),project:'ATS Demo',title:'BOM 변경사항 확인',owner:'박품질',due:today(),status:'완료'}
  ];
} catch { tasks=[]; $('notice').textContent='저장 데이터를 읽을 수 없습니다. 백업 파일을 불러오거나 새 업무를 등록하세요.'; }
function save(next) {
  try {localStorage.setItem(KEY,JSON.stringify(next));tasks=next;$('notice').textContent='저장했습니다.';render();return true;}
  catch {$('notice').textContent='저장하지 못했습니다. 브라우저 저장 공간 또는 개인정보 보호 설정을 확인하세요.';return false;}
}
const overdue = t => t.status!=='완료' && t.due<today();
function cell(row,text){const td=document.createElement('td');td.textContent=text;row.append(td);return td;}
function render(){
  $('total').textContent=tasks.length;$('active').textContent=tasks.filter(t=>t.status==='진행 중').length;$('late').textContent=tasks.filter(overdue).length;
  const query=$('search').value.trim().toLowerCase();
  const shown=tasks.filter(t=>(!$('filter').value||t.status===$('filter').value)&&[t.project,t.title,t.owner].join(' ').toLowerCase().includes(query)).sort((a,b)=>a.due.localeCompare(b.due));
  $('tasks').replaceChildren();
  for(const t of shown){
    const row=document.createElement('tr');cell(row,t.project);cell(row,t.title);cell(row,t.owner);
    const date=cell(row,t.due+(overdue(t)?' · 지연':''));if(overdue(t))date.className='late';
    const select=document.createElement('select');select.setAttribute('aria-label',`${t.title} 상태`);
    STATES.forEach(s=>{const o=document.createElement('option');o.textContent=s;o.selected=s===t.status;select.append(o);});
    select.addEventListener('change',()=>{if(!save(tasks.map(x=>x.id===t.id?{...x,status:select.value}:x)))select.value=t.status;});cell(row,'').append(select);
    const del=document.createElement('button');del.type='button';del.className='delete';del.textContent='삭제';del.setAttribute('aria-label',`${t.title} 삭제`);del.onclick=()=>{if(confirm(`‘${t.title}’ 업무를 삭제할까요?`))save(tasks.filter(x=>x.id!==t.id));};cell(row,'').append(del);$('tasks').append(row);
  }
  if(!shown.length){const row=document.createElement('tr');const td=cell(row,'표시할 업무가 없습니다. 새 업무를 등록하거나 검색 조건을 바꿔보세요.');td.colSpan=6;td.className='empty';$('tasks').append(row);}
}
$('task-form').addEventListener('submit',e=>{e.preventDefault();const task={id:uid(),project:$('project').value.trim(),title:$('title').value.trim(),owner:$('owner').value.trim(),due:$('due').value,status:'대기'};if(!validTasks([task])){$('notice').textContent='공백만 입력할 수 없습니다. 항목과 날짜를 확인하세요.';return;}if(tasks.length>=10000){$('notice').textContent='최대 10,000개까지 등록할 수 있습니다.';return;}if(save([...tasks,task])){$('task-form').reset();$('due').value=today();}});
$('search').addEventListener('input',render);$('filter').addEventListener('change',render);
$('export').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(tasks,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`engineering-tasks-${today()}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('import').onclick=()=>$('file').click();
$('file').addEventListener('change',async()=>{const file=$('file').files[0];if(!file)return;try{if(file.size>10*1024*1024)throw new Error();const next=JSON.parse(await file.text());if(!validTasks(next))throw new Error();if(confirm(`현재 업무를 백업의 ${next.length}개 업무로 교체할까요?`))save(next.map(t=>({id:t.id,project:t.project,title:t.title,owner:t.owner,due:t.due,status:t.status})));}catch{$('notice').textContent='올바른 업무 백업 JSON 파일이 아닙니다. 현재 데이터는 유지됩니다.';}finally{$('file').value='';}});
$('due').value=today();render();
