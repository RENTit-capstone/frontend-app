# 대학교내 물품 대여 서비스 RENTit
![KakaoTalk_20250605_232252838](https://github.com/user-attachments/assets/3c5b6a0b-175d-431a-89e8-c56a9c3e50da)

## 👤 팀원 소개
|이름|학과|학번|역할|
|---|---|---|---|
|김지환|소프트웨어학과|202020768|raspberry pi, frontend(app/web)|
|박준우|소프트웨어학과|202020798|backend|
|장지윤|소프트웨어학과|202127418|frontend(app/web)|

## 🎈 프로젝트 개요

### Main Target
비대면으로 교내에서 안전하게 물건을 빌리고 싶은 대학생

### Problem
- 직접 만나서 물건을 주고 받는 게 부담스러움
- 대여 절차가 복잡하거나 불확실함
- 반납 시 파손 책임 분쟁이 걱정됨

### Solution
- 모바일 앱을 통한 손쉬운 대여 신청
- OTP인증 기반으로 비대면 거래 지원
- 키오스크 UI로 손쉽게 대여/반납
- 사진을 통한 반납 인증
- 파손 정책 템플릿 제공 및 원하는 대로 수정 가능

## 🛠️ 개발 아키텍처
<details>
<summary><b>시스템 개요</b></summary>

</br>

![architecture](https://github.com/user-attachments/assets/ce2576cf-a240-4773-8b6d-f87e2457140b)

</br>

</details>

<details>
<summary><b>CI/CD</b></summary>

</br>

### 프론트엔드 - 웹
![devops frontend](https://github.com/user-attachments/assets/a71426a6-0738-498a-9208-cc9de492bbaf)

### 백엔드
![devops Backend](https://github.com/user-attachments/assets/4ca86323-b550-4f5a-9e5a-6cd95cb76974)

### Rasberry Pi
![devops rpi](https://github.com/user-attachments/assets/35978d03-9203-4fab-9a06-5e209b9dafff)

</details>

</br>

## 🗃️ 주요 기술 스택

<details>
<summary><b> Front-End(Web) </b></summary>

</br>

| 기술 스택 | 사용 목적 및 선택 이유 |
| --- | --- |
| React | UI 컴포넌트 기반의 웹 애플리케이션 개발을 위해 사용한다. 팀원이 사전에 사용해본 경험이 있으며, 생태계가 풍부하고 유지보수가 용이한 구조를 제공한다. |
| HTML | 웹 페이지의 구조를 정의하기 위해 사용한다. 모든 웹의 기반이며, SEO 및 접근성 측면에서도 필수적인 요소이다. |
| CSS | 디자인 및 레이아웃 스타일링을 위해 사용한다. |
| JavaScript | 동적인 UI 기능 구현 및 웹 페이지의 이벤트 처리, DOM 조작 등 웹 앱 동작의 핵심적인 언어이다. |
| Vite | 프론트엔드 빌드 및 개발 서버로 사용한다. 빠른 모듈 번들링과 HMR(Hot Module Replacement)을 제공하여, 개발 과정의 생산성을 높인다. |
| tailwindCSS | 빠른 개발 속도와 일관된 디자인 시스템을 적용하기 위해 선택하였다. 러닝커브가 다소 있지만 시장 점유율이 매우 높아 많은 레퍼런스로 커버 할 수 있을 것이라 예상하였다. Styled Component의 경우 반복되는 코드의 양을 줄이고 효율적인 CSS를 작성하기 위한 노력이 필요하나, tailwindCSS는 저수준의 유틸리티 클래스를 반복적으로 사용하는 방식을 권장하기 때문에 코드 리팩토링, 효율성을 위한 노력을 어느정도 덜어주는 효과를 기대하였다. |
| axios | 백엔드와 통신하는 API구현을 쉽게 하기 위해 사용하였다. Axios Instance, intercept 등의 기능을 제공하여 API 호출 함수를 쉽게 모듈화 할 수 있고, 공통 request 헤더, 자동 로그인 등을 적은 양의 코드로 구현할 수 있다. fetchAPI의 경우 response를 직접 JSON 형식으로 변환해야 하며 앞서 말한 기능을 직접 구현해야 하므로, axios를 사용하면 개발 속도 및 생산성을 높일 수 있을 것이라 기대하였다. |
| TypeScript | 정적 타입 기반의 개발을 지원하기 위해 사용한다. 컴파일 타임에 오류를 방지하고, 협업 시에 코드 안정성을 향상시켜 에러 및 버그를 미연에 방지할 수 있다. |
| recharts | 데이터를 시각화하는 컴포넌트를 제공한다. 간결한 문법으로 손쉽게 차트와 그래프 시각화를 구현할 수 있다. 동일한 데이터 시각화 라이브러리인 Chart.js도 고려하였으나, rechart가 통합, 문법 면에서 react에 더 친화적인 사항을 고려하였다. |
</br>

</details>


<details>
<summary><b> Front-End(App) </b></summary>

</br>

| 기술 스택 | 사용 목적 및 선택 이유 |
| --- | --- |
| React Native | Andriod와 iOS를 동시에 지원할 수 있으며, React 생태계와의 코드 공유가 가능하여 러닝커브가 낮고 개발 효율성이 높아서 사용한다. Flutter도 고려 대상이었으나, 팀원들이 React에 더 익숙하고, 도입까지 공부할 수 있는 시간이 부족하다고 판단하여 RN을 사용하게 되었다. |
| JavaScript | React Native 및 다양한 라이브러리와 연동되며, 빠른 프로토타이핑에 적합한 표준 스크립트 언어이다. |
| TypeScript | 정적 타입 기반의 개발을 지원하기 위해 사용한다. 컴파일 타임에 오류를 방지하고, 협업 시에 코드 안정성을 향상시켜 에러 및 버그를 미연에 방지할 수 있다. |
| Expo | 초기 개발 속도를 높이고 복잡한 네이티브 설정을 간소화하기 위해 사용하였고, 커뮤니티가 매우 활발하여 도움을 받을 수 있는 창구가 많다. 추후 필요 시 expo를 eject하여 네이티브 기능 확장도 할 수 있을 것으로 기대한다. |
| expo router | 페이지 기반 자동 라우팅을 지원하여 디렉토리 구조가 곧 app의 사이트맵과 유사한 구조를 가진다. react navigation을 사용할 때 처럼 직접 설정해야 하는 부분이 적고, 구조에 적응하면 빠르게 익힐 수 있어 선택하였다. |
| StyleSheet API | react-native 환경에서 기본적으로 styling을 적용하기 위한 tool이며, 많은 framework, library를 제치고 2024년 기준 개발자들이 2번째로 많이 사용함을 고려하였다. tamagui, react-native-paper, nativewind등 다른 UI library 및 tool도 테스트하였으나, 성능 저하, 버그, 지원하는 기능 등의 관점에서 StyleSheet API를 사용하는 것이 최선이라고 판단하였다. |

</br>

</details>

<details>
<summary><b> Back-End(Web/App) </b></summary>

</br>

| 기술 스택 | 사용 목적 및 선택 이유 |
| --- | --- |
| Java 21 | Spring 생태계의 기본 언어, LTS 버전으로 높은 안정성을 보임. |
| Spring Boot 3.4.4 | Java 웹 애플리케이션을 빠르고 쉽게 구축하기 위해 사용되는 프레임워크. 내장 서버, 자동 구성 등 개발 편의성을 제공함. |
| Spring Web (MVC) | RESTful API를 생성하고 웹 요청을 처리하는 등 웹 애플리케이션의 컨트롤러 계층을 구축하기 위해 사용됨. |
| Spring Data JPA | 데이터베이스와 상호작용하는 데이터 접근 계층을 쉽게 구현하기 위해 사용됨. 기본적인 CRUD 작업을 간단히 처리할 수 있음. |
| QueryDSL | 컴파일 시점에 문법 오류를 잡을 수 있는 타입-세이프(Type-safe) 쿼리를 Java 코드로 작성하기 위해 사용됨. |
| MySQL | 서비스 특성상 관계형 데이터베이스를 요구하기 때문에 사용.
| H2 Database | 개발 초기나 단위 테스트 환경에서 실제 데이터베이스 없이 애플리케이션을 테스트하기 위해 사용. |
| Spring Data Redis | 토큰 및 OTP 값을 효율적으로 관리하기 위해 사용. |
| Spring Security | 애플리케이션의 인증과 인가 기능을 구현하기 위해 사용. |
| JWT | RESTful API 환경에서 사용자의 인증 상태를 안전하게 유지하기 위해 사용. |
| Spring Boot Starter Test | JUnit 5, Mockito 등 Spring Boot 애플리케이션을 테스트하는 데 필요한 핵심 라이브러리. |
| Spring REST Docs | 테스트 코드를 기반으로 API 명세를 자동으로 생성하고 관리하기 위해 사용. 코드 기반이라 문서의 신뢰도가 높음. |
| Asciidoctor | Spring REST Docs로 생성된 문서 스니펫을 조합하여 최종 HTML 문서를 생성하기 위해 사용. |
| Jacoco | 테스트 코드의 코드 커버리지를 측정하고 리포트를 생성하기 위해 사용. |
| Spring Boot Starter Mail | 회원가입 시 이메일 인증을 위해 사용. |
| Firebase Admin SDK (FCM) | Firebase Cloud Messaging을 통해 모바일 앱에 푸시 알림을 발송하기 위해 사용. |
| Spring Boot Actuator | 애플리케이션의 상태(헬스 체크, 메트릭 등)를 HTTP 엔드포인트를 통해 외부에서 모니터링하기 위해 사용. |
| Micrometer (Prometheus) | Actuator가 수집한 메트릭을 Prometheus 모니터링 시스템이 수집할 수 있는 형식으로 변환하여 노출하기 위해 사용. |

</br>

</details>

<details>
<summary><b> Front-End(Raspberry Pi) </b></summary>

| 기술 스택 | 사용 목적 및 선택 이유 |
| --- | --- |
| HTML | 웹페이지의 기본 구조를 구성하기 위해 사용한다. |
| CSS | 키오스크 UI의 스타일링과 레이아웃 구성을 위해 사용한다. |
| JS | 버튼 인터랙션, 상태 변경 등 동적인 기능을 구현하기 위해 사용하며, 자체 개발한 초경량 프론트엔드 프레임워크인 supeRThin의 핵심 구현 언어로도 사용한다다. |
| Chromium | HTML, CSS, JS로 구성된 웹페이지를 Raspberry Pi에서 로컬 환경으로 구동하기 위해 사용한다. |
| supeRThin | JS로 자체개발한 프론트엔드 프레임워크로, React나 Preact(React의 경량화 버전)보다 더 가볍게 구성되어 Raspberry Pi같은 저사양 환경에서도 충분히 구동된다. 상태관리, 컴포넌트 기반의 UI 개발을 통해, 프론트엔드 개발의 생산성을 높이기 위해 사용한다. |

</br>

</details>

<details>
<summary><b> Back-End(Rasberry Pi) </b></summary>


| 기술 스택 | 사용 목적 및 선택 이유 |
| --- | --- |
| FastAPI | 프론트에서 입력 된 데이터와 RabbitMQ로부터 전달되는 데이터를 처리하고, 키오스크 내부 제어 로직을 수행하기 위한 경량 웹서버로 사용한다. |
| FastAPI-MQTT | FastAPI와 RabbitMQ 간의 통신을 MQTT기반으로 구현하여, 비동기 메시지 수신 및 명령 수행을 지원하기에 사용한다. |
| Python | FastAPI 및 zerogpio 등 주요 키오스크 제어 모듈을 구동하기 위한 기본 언어로 사용한다. |
| zerogpio | Raspberry Pi 보드의 GPIO와 PWM을 Python 환경에서 관리하여, 물리적 락 제어나 센서 연동을 구현하기 위해 사용한다. |

</br>

</details>

<details>
<summary><b> MiddleWare </b></summary>

| 기술 스택 | 사용 목적 및 선택 이유 |
| --- | --- |
| RabbitMQ / MQTT | MQTT 프로토콜을 사용하여 메시지를 발행하고 구독. Spring Boot API서버와 Raspberry Pi의 FastAPI간 통신을 비동기적으로 중계하고 제어하기 위해 사용. |


</br>

</details>


<details>
<summary><b> Cloud 및 Infrastructure 구성 </b></summary>

| 기술 스택 | 사용 목적 및 선택 이유 |
| --- | --- |
| Global Edge(CDN) | 정적 웹 자산을 사용자들에게 빠르게 전달하고, 실제 정적 파일을 배포하는 Object Storage의 접근 부하를 줄이기 위해 사용한다. |
| Gateway | 내부 서버 API를 외부로 연결하고, 이 과정에서 보안 및 인증을 강화하기 위해 사용한다. |
| Object Storage | 이미지, 로그파일 등의 비정형 데이터를 저장하고, 또한 웹 페이지 정적 파일들을 배포하는 웹서버로서 동작하도록 하기 위해 사용한다. |
| ALB(Application Load Balancer) | 트래픽을 Auto Scaling을 통해 증설된 Server Instance로 분산해주기 위해 사용한다. |
| Server Instance | 백엔드 API 서버 등의 핵심 서비스를 호스팅하기 위해 사용한다. |
| Auto Scaling | 사용량이 몰리는 시간 등에 Server Instance를 정해진 규칙에 따라 자동으로 늘리고 줄이기 위해 사용한다. |
| Simple RabbitMQ | 키오스크와 서버 간의 메시지 통신을 관리하고, 비동기 처리를 통해 안정적인 연결을 지원하기 위해 사용한다. |
| subnet | 네트워크를 논리적인 단계에서 분리하여 보안성과 관리 효율을 높히기 위해 사용한다. |
| VPC | 격리된 네트워크 환경을 구축하여, 보안성과 제어력을 손쉽게 확보하기 위해 사용한다. |

</br>

</details>
