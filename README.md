#기술스택
React, Typescript, Tailwind CSS, 

#주요 라이브러리
React Query, Material Tailwind

#배포 환경
aws s3 cloud front

#실행 방법
1. npm install
2. npm run start

#빌드 및 배포 방법
1. npm run build
2. npm run deploy



#추가 기능 구현

1. URL 중복 저장 방지
-> 고유한 URL 주소를 저장하기 위함

2.http, https 선택 제공
-> URL 형식을 준수하여 작성하기 위함, URL 형식에 대해 지식이 부족한 일반인 유저들에게 입력값 특정 부분을 강제함으로써
올바른 URL 저장 할 수 있도록 지원

3. 정규식을 통한 URL 주소 검증
-> 위 2의 이유와 같음

4. URL 입력값을 입력 할 때 마다 3의 과정을 거치고 에러메시지 생성 및 저장 버튼 비활성화
-> 유저들이 올바른 URL을 저장할 수 있도록 가이드 제공

5. 저장된 URL이 없을 시 fallback UI (URL이 존재하지 않는다는 메시지를 보여주는 UI) 생성
-> 유저들에게 현재 URL 리스트 상태에 대한 적절한 정보 제공

6. Error Boundary를 통한 에러 핸들링
-> 전역적으로 에러 캐치 및 핸들링에 용이
