## Interceptor란?

- Interceptor란 Axios의 라이브러리 중 하나로 request와 response가 then과 catch에 의해 처리되기 전에 전역적으로 가로채게 합니다.

## 사용하는 이유

- Interceptor를 사용하면, response 또는 request 되기 전에 정보를 각각 수정할 수 있습니다.
- 나가는 요청, 들어오는 응답 또는 오류에 대한 정보를 로깅하여 디버깅 또는 모니터링하는 데 도움이 될 수 있습니다.
- 반복적인 요청 및 응답에 대한 중복 코드를 줄이고 유지보수성을 향상 시킬 수 있습니다.

## 대표적인 사례

- request에 헤더를 추가하거나, 인증 관련 토큰을 첨부하는 데 사용됩니다.

## Interceptor 구현 방법

- 생성한 Axios Instance에 인터셉터를 추가하여, API 요청 또는 응답이 되기 전에 수행될 작업을 정의합니다.