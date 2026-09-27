# 설계 업무 보드 — GitHub 앱 만들기 예제

설치나 API 키 없이 브라우저에서 실행하는 한국어 업무 관리 앱입니다.
예시 업무는 모두 가상이며 HTML/CSS/JavaScript만 사용합니다.

## 1. 먼저 실행하기

압축을 풀고 `index.html`을 Chrome 또는 Edge로 여세요.
업무 등록 → 상태 변경 → 검색 → 백업 저장을 해보세요.
이 환경에서 파일 직접 실행 시 저장이 제한되면 GitHub Pages로 실행하세요.

## 2. GitHub에 코드 올리기

1. https://github.com 에 로그인하고 오른쪽 위 `+` → `New repository`를 선택합니다.
2. 저장소 이름은 `engineering-task-app`으로 입력합니다.
3. 무료 GitHub Pages 실습용으로 Public을 선택하고 저장소를 만듭니다.
4. 빈 저장소의 `uploading an existing file` 링크 또는 `Add file → Upload files`를 누릅니다.
5. 압축파일 자체가 아니라 **index.html, app.js, README.md**를 업로드합니다. 저장소 최상위에 index.html이 보여야 합니다.
6. `Commit changes`로 저장합니다.

Public 저장소에 올린 코드와 포함된 파일은 공개됩니다. 실제 회사 도면이나 기밀 데이터는 넣지 마세요.

## 3. 앱 주소 만들기

1. 저장소 `Settings → Pages`로 이동합니다.
2. `Build and deployment → Source`에서 `Deploy from a branch`를 선택합니다.
3. Branch는 `main`, 폴더는 `/(root)`를 선택하고 `Save`를 누릅니다.
4. 배포 완료 후 Pages에 표시되는 링크를 엽니다. 일반적인 형식은 `https://본인아이디.github.io/engineering-task-app/`입니다.
5. 이제 휴대폰과 PC에서 접속할 수 있습니다. 데이터는 각 기기 브라우저별로 따로 저장됩니다.

공식 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 4. 코드를 수정하며 연습하기

GitHub에서 index.html 선택 → 연필 아이콘으로 편집 → 제목 수정 → Commit changes.
Pages 배포가 완료되면 앱을 새로고침해 변경을 확인합니다.

AI에게 다음과 같이 요청하며 확장할 수 있습니다.

> 이 저장소의 설계 업무 보드에 우선순위(높음/보통/낮음)를 추가해줘. 업무 등록, 목록, 필터, 백업에 반영하고 기존 저장 데이터도 호환되게 해줘.

> 업무 제목과 담당자, 마감일을 수정하는 편집 기능을 추가해줘.

## 파일 역할

| 파일 | 역할 |
| --- | --- |
| index.html | 화면 구조, 색상, 모바일 레이아웃 |
| app.js | 등록·삭제·상태 변경·검색·브라우저 저장·JSON 백업 |
| README.md | 실행 및 GitHub Pages 안내 |

## 저장 방식과 범위

- 로그인, 서버, 데이터베이스 없이 동작하는 개인용 예제입니다.
- 입력 내용은 localStorage에 저장됩니다. GitHub에 업무 데이터가 자동 전송되지는 않습니다.
- 동일 기기라도 브라우저나 접속 주소가 달라지면 데이터가 다릅니다. 로컬 파일에서 Pages로 옮길 때 백업을 저장한 뒤 불러오세요.
- 데이터 삭제나 시크릿 모드 종료로 기록이 사라질 수 있으므로 백업을 사용하세요.
- 백업 불러오기는 현재 목록 전체를 교체합니다. 최대 10,000개 업무, 10MB 백업 파일을 지원합니다.
- 여러 탭에서 동시 수정하면 마지막 저장이 반영됩니다. 팀 공동사용에는 로그인과 서버 DB를 추가해야 합니다.
- 저장소 생성과 인터넷 배포는 사용자가 위 단계를 수행해야 합니다. 이 ZIP은 업로드 가능한 소스 예제입니다.
