# Lighthouse CI

프로덕션 배포 환경(`https://chcse.knu.ac.kr/festival`)의 성능을 측정하기 위한 Lighthouse CI 설정입니다.

## 실행 방법

GitHub Actions 탭에서 수동으로 트리거합니다.

```bash
# GitHub CLI로 실행
gh workflow run lighthouse.yml --field target=prod

# 특정 브랜치 기준으로 실행
gh workflow run lighthouse.yml --ref <branch> --field target=prod
```

`target` 옵션:

- `prod` — `https://chcse.knu.ac.kr/festival` 측정
- `local` — `pnpm preview` 서버 실행 후 `http://localhost:4173` 측정

## 결과 확인

**아티팩트**: Actions 탭 → 해당 run → Artifacts → `lighthouse-prod-run{N}.zip` 다운로드 (90일 보관)

- `lhr-*.json` — Lighthouse Result JSON (상세 데이터)
- `lhr-*.html` — Lighthouse Report HTML (브라우저에서 열기)

**PR 댓글**: 해당 브랜치에 열린 PR이 있으면 점수 테이블이 자동으로 댓글로 등록됩니다.

```
## 🔦 Lighthouse 측정 결과 (`prod`)

| 카테고리       | 점수  |
|----------------|-------|
| Performance    | 🔴 42 |
| Accessibility  | 🟡 80 |
| Best Practices | 🟡 68 |
| SEO            | 🟢 92 |
```

PR이 없으면 댓글은 스킵되고 아티팩트로만 확인 가능합니다.

## 측정 설정 (`lighthouserc.cjs`)

```js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
        },
      },
    },
  },
};
```

모바일 환경(iPhone 14 기준) 단일 측정입니다.

## 최적화 이력

### 2026-05-17 — 스탬프 투어 페이지 최적화

**측정 결과 비교 (`local` 환경, `refactor/#112` 브랜치)**

| 페이지              | 시점      | Performance | Accessibility | Best Practices | SEO         |
| ------------------- | --------- | ----------- | ------------- | -------------- | ----------- |
| `/stamptour`        | 최적화 전 | 🟡 56       | 🟡 82         | 🟡 71          | 🟢 92       |
| `/stamptour`        | 최적화 후 | 🟡 56       | 🟡 82         | 🟢 93 (+22)    | 🟢 100 (+8) |
| `/stamptour/booths` | 최적화 전 | 🟡 56       | 🟡 80         | 🟡 75          | 🟢 92       |
| `/stamptour/booths` | 최적화 후 | 🟡 56       | 🟡 80         | 🟢 96 (+21)    | 🟢 100 (+8) |

> Performance는 local 환경 특성상 네트워크 지연이 없어 이미지 크기 감소 효과가 반영되지 않는다. prod 배포 후 재측정 필요.
>
> Accessibility가 유지된 이유는 `BoothCard`의 `text-[#999]` 색상 대비(2.85:1)가 WCAG AA 기준(4.5:1) 미달인 채로 남아 있기 때문이다. 디자이너 확인 후 `#737373` 이상으로 수정하면 추가 개선 가능하다.

**적용 내용**

| 분류          | 변경 내용                                                                 | 효과                       |
| ------------- | ------------------------------------------------------------------------- | -------------------------- |
| Performance   | booth_map SVG(4.4MB × 7) → WebP(~15KB × 7), Figma @3x PNG 기반            | 이미지 총량 ~30MB → ~100KB |
| Performance   | stampTour 전체 이미지 SVG/PNG → WebP 변환                                 | 약 18MB → ~566KB           |
| Performance   | fold 아래 이미지에 `loading="lazy"` 적용 (ProcessCard, prize, booth 지도) | 초기 로드 개선             |
| Performance   | `stampHero`에 `fetchPriority="high"` + `width`/`height` 명시              | LCP 개선, CLS 방지         |
| Accessibility | `TabNavigation` 활성 탭에 `aria-current="page"` 추가                      | 스크린리더 탭 상태 인식    |
| Accessibility | `BoothCard` 상세정보 버튼에 `aria-expanded`, `aria-label` 추가            | 토글 상태 및 대상 명시     |
| Accessibility | `GradientBanner` 제목 태그 `h2` → `h1`                                    | 페이지 heading 계층 수정   |
| Accessibility | 부스 지도 이미지 alt 텍스트 `'부스 지도'` → `'${name} 부스 위치 지도'`    | 의미있는 alt 제공          |
| Code          | `BoothCard` arrow 이미지 → `lucide-react` `ChevronDown` 아이콘으로 교체   | 벡터 아이콘, 파일 제거     |

### 2026-05-19 — 전체 사이트 성능·접근성 최적화 (`refactor/#147`)

**적용 내용**

| 분류          | 변경 내용                                                                                                                                                       | 효과                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Performance   | 롤링페이퍼 프레임·카테고리, 크레딧, 호반우 인생두컷, 지도·예약 아이콘 등 잔여 에셋 전체 WebP 변환                                                               | 이미지 총량 수십 MB 절감        |
| Performance   | LCP 이미지에 `fetchPriority="high"` 적용 (CongratVideoPage heroBg, CampusMap 지도, IntroTab 포토부스)                                                           | LCP 개선                        |
| Performance   | Pretendard CDN(`cdn.jsdelivr.net`)에 `<link rel="preconnect" crossorigin>` 추가                                                                                 | 렌더 블로킹 폰트 로드 지연 완화 |
| Performance   | fold 아래 이미지에 `loading="lazy"` 적용 (TavernCard·TavernDetailView 메뉴판, CongratVideoPage about80th·발전기금, MemberCard 프로필, VideoCard YouTube 썸네일) | 초기 로드 개선                  |
| Accessibility | `BoothCard`, `RollingPaperCategoryCard`, `RollingPaperChannelCard` 텍스트 `text-[#999]` → `text-[#737373]` (2.85:1 → 4.63:1, WCAG AA 통과)                      | 색상 대비 기준 충족             |

> `text-[#808080]` (3.95:1, WCAG AA 미달)은 프로젝트 전반 53개소에 사용 중. 디자이너 확인 후 별도 수정 필요.

### 2026-09-08 — Wanted Sans 가변 폰트 → 굵기별 CDN 서브셋 전환 (#5)

**측정 결과 비교** (개인 fork 배포 도메인 `knu-festival-80th-client-tau.vercel.app`, `pnpm dlx lighthouse` 직접 실행, mobile 390×844 · simulate throttling)

> 원 배포 주소(`chcse.knu.ac.kr/festival`)는 축제 종료로 서버가 내려가 있어, 동일 코드가 배포된 개인 fork 주소에서 측정했다. `lighthouserc.cjs`와 동일한 모바일 조건을 그대로 사용했다.

| 페이지        | 시점 | Performance | LCP        | TTI        | 폰트 전송량         | 페이지 총 전송량      |
| ------------- | ---- | ----------- | ---------- | ---------- | -------------------- | ---------------------- |
| `/`           | 전   | 🟡 56       | 10.7s      | 10.8s      | 1,259.9KB             | 2,482.2KB               |
| `/`           | 후   | 🟡 65 (+9)  | **5.6s**   | **5.7s**   | **513.9KB**           | **1,796.3KB**           |
| `/stamptour`  | 전   | 🟡 68       | 11.0s      | 11.0s      | 1,259.9KB             | 2,414.6KB               |
| `/stamptour`  | 후   | 🟡 68       | **6.5s**   | **6.5s**   | **262.3KB**           | **1,477.2KB**           |
| `/instating`  | 전   | 🟡 67       | 10.7s      | 10.7s      | 1,260.1KB             | 1,995.1KB               |
| `/instating`  | 후   | 🟡 69 (+2)  | **6.0s**   | **6.0s**   | **507.1KB**           | **1,302.5KB**           |

> LCP·TTI는 세 페이지 모두 거의 절반으로 줄었지만 Performance 점수 자체는 완만하게만 올랐다. Lighthouse의 Performance 채점은 로그 스케일 곡선이라, LCP가 여전히 4초 기준을 크게 웃도는 "나쁨" 구간 안에서는 절대 시간이 크게 줄어도 점수 상승폭이 작게 나온다.
>
> 이 개선분은 이슈 #156(2026-05-19, prod 42점 확인 후 번들 분리·preconnect·이미지 WebP로 대응)에는 포함되지 않았던 항목이다 — 당시 문서에 없던 별개의 로컬 가변 폰트(1.29MB) 파일이 이후에 추가되어 있었다.

**원인**

네트워크 요청을 분석한 결과 `public/fonts/WantedSansVariable.woff2`(1.29MB, `font-weight: 100 900` 전체 가변 축, `priority: VeryHigh`)가 페이지 내 어떤 이미지보다도 커서, throttled 환경에서 이 파일 하나가 JS 번들·LCP 이미지보다 먼저 대역폭을 점유하고 있었다. 실제 코드에서 쓰는 굵기는 Regular·Medium·SemiBold·Bold·ExtraBold 5개뿐이었다.

**적용 내용**

| 분류        | 변경 내용                                                                                             | 효과                                    |
| ----------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Performance | 로컬 가변 폰트(1.29MB) 제거, wanted-sans 공식 CDN(jsdelivr, 굵기별·유니코드 범위별 분할 서브셋)로 교체 | 폰트 전송량 페이지당 60~80% 감소         |
| Performance | Pretendard와 동일 호스트(`cdn.jsdelivr.net`) 사용으로 기존 `preconnect` 재사용                         | 추가 DNS·TCP·TLS 연결 비용 없음          |

**남은 병목**

- `unused-javascript` 감사 기준 `/stamptour`의 JS 번들(380.5KB) 중 210.3KB(55%)가 해당 페이지에서 미사용으로 잡힘. 다만 실제 네트워크 로그를 확인해보니 `App.tsx`는 모든 라우트를 `React.lazy()`로 감싸고 있고, `/stamptour` 방문 시 받는 라우트별 청크(`stampTour-*.js` 2.4KB, `StampTourIntroView-*.js` 1.5KB, `ProcessCard-*.js` 1.1KB 등)는 정상적으로 잘게 분리되어 있다. 380KB는 라우트 미분리가 아니라 모든 페이지가 공유하는 벤더 번들(React·Router·분석 SDK 등)이며, "미사용 55%"는 이 벤더 코드 중 현재 페이지에서 실행되지 않는 조건부 경로(분석 SDK 등)를 커버리지 도구가 잡은 것으로 보인다. 벤더 청크를 더 세분화할 여지는 있지만 우선순위 낮음.
- `render-blocking-insight`가 새로 추가된 굵기별 CSS 5개(각 150ms) + Pretendard CSS(775ms)를 렌더 블로킹으로 지목. 다만 `metricSavings`가 `{ FCP: 950, LCP: 0 }`으로 명시되어 있어 LCP에는 영향이 없고, 병렬 요청 특성상 실제 절감은 표시된 합산치보다 작을 것으로 판단해 별도 조치는 보류.
- 홈(`/`) 상단 `step_1`~`step_3` 일러스트 3장이 각각 91~198KB로 여전히 큼. `ProcessCard`에 `loading="lazy"`는 이미 적용되어 있어(뷰포트 밖으로 미룸) 초기 로드를 막지는 않으며, 남은 여지는 WebP 압축률 자체를 더 낮추는 것뿐.

## 주의사항

- `lighthouserc.cjs` — `package.json`에 `"type": "module"` 설정이 있어 `.js` 확장자는 ESM으로 해석됩니다. CommonJS 문법(`module.exports`)을 사용하기 위해 `.cjs` 확장자를 사용합니다.
- `include-hidden-files: true` — `.lighthouseci/`는 숨김 디렉토리라 `actions/upload-artifact@v4` 기본 설정에서 업로드 대상에서 제외됩니다.
