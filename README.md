# 과제 개요
- 주제 : 운동 SNS 서비스
- 기능 : 1. 로그인, 2. 권한, 3. 운동 포스트 CRUD, 4. 댓글
- 메인 화면에서 운동 사진 리스트 제공
- 운동 유형 설정으로 사진 업로드 가능 (유형 : 스쿼트, 런지, 벤치프레스, 런닝, 기타)
- 사진은 최대 5장까지 업로드 가능, 업로드시 상태메시지 입력 가능 (일 최대 5장으로 이해)
- 업로드된 사진에 댓글 입력 가능 (최대 5개, 대댓글, 스크롤 고려 X)
- 리스트 필터가 있어야 함 ( 운동유형, 업로드 시간 최신/과거순, 댓글 생성시간 최신/과거순)
- Infinite Scroll로 pagination 처리
- 사진 보기 기능은 Carousel slide로 팝업 또는 새로운 페이지로 확인하기
- 사진보기에서 화면 상단에 업로드 날짜가 나오면 업로드 날짜 옆으로 다른 날짜의 사진으로 이동할 수 있는 네비게이션 버튼 존재

# 문제해결을 위한 아이디어 요약
- 프로세스 항목
  - 1. 로그인
  - 2. 운동 사진 리스트 확인
  - 3. 운동 사진 추가하기
  - 4. 사진에 댓글 달기

- 작업 리스트 항목
  - 1. 로그인 / 로그아웃 기능 구현
  - 2. 권한 처리
  - 3. Mock API 적용
  - 4. 운동 사진 리스트 infinite scroll 적용
  - 5. 운동 사진 리스트 필터 적용
  - 6. 운동 사진 리스트 추가 기능 적용
  - 7. 운동 사진 상세 보기 기능 적용
  - 8. 운동 사진 상세 변경 기능 적용
  - 9. 운동 사진 상세 삭제 기능 적용
  - 10. 운동 사진 상세 댓글 기능 적용

- API설계
  - 1. 로그인<br/>
      1-1. method : POST<br/>
      1-2. url : /api/user<br/>
      1-3. param : {id : 입력한 id, password : 입력한 비밀번호}<br/>
      1-4. success : 로그인에 성공한 유저 정보<br/>
  - 2. 사진리스트 조회<br/>
      2-1. method : GET<br/>
      2-2. url : /api/post/list<br/>
      2-3. param : {userIdx : 유저 idx, page : pagination 처리를 위한 변수, size : 가지고 올 게시물 수, category : 운동유형, upload : 업로드 최신/과거순, comment : 댓글시간 최신/과거순}<br/>
      2-4. success : 해당하는 사진 리스트 데이터 제공
  - 3. 사진 상세 조회<br/>
      3-1. method : GET<br/>
      3-2. url : /api/post/view<br/>
      3-3. param : {userIdx : 유저 idx, targetDate : 타겟 날짜}<br/>
      3-4. success : 해당하는 날짜 사진 리스트 및 가까운 과거, 미래 날짜 제공
  - 4. 사진 업로드<br/>
      4-1. method : POST<br/>
      4-2. url : /api/post<br/>
      4-3. param : {userIdx : 유저 idx, category : 선택한 운동유형, uploadFile : 올리는 사진}<br/>
      4-4. success : 성공했는지 여부 전달
  - 5. 사진 변경<br/>
      5-1. method : PUT<br/>
      5-2. url : /api/post/{postIdx}<br/>
      5-3. param : {userIdx : 유저 idx, category : 선택한 운동유형, uploadFile : 올리는 사진}<br/>
      5-4. success : 성공했는지 여부 전달
  - 6. 사진 삭제<br/>
      6-1. method : DELETE<br/>
      6-2. url : /api/post/{postIdx}<br/>
      6-3. param : null<br/>
      6-4. success : 성공했는지 여부 전달
  - 7. 댓글 등록<br/>
      7-1. method : POST<br/>
      7-2. url : /api/comment<br/>
      7-3. param : {userIdx : 유저 idx, postIdx : 댓글달려는 사진 idx, description: 댓글 내용}<br/>
      7-4. success : 성공했는지 여부 전달

# 개발 환경
- FE : React + Typescript
- BE : msw
- 환경 구성 : vite로 진행

# 프로젝트 빌드 & 테스트 & 실행 방법
- 프로젝트 빌드 시 : npm run build 명령어 실행
- 프로젝트 테스트 시 : 프로젝트 clone 후 npm install, npm run dev 실행
- 실행 방법 : 현재 유저는 test1, test1234로 접속 가능, 매니저는 admin, admin1234로 접속 가능

# 미해결 이슈 정리
- 변경시 기존에 설정된 파일 불러오기 해결해야 함.
- BE 없이 msw로 구성하여 insert와 delete update 테스트 불가.
