# Rolling Paper Sticker Text Alignment

## 문제

롤링페이퍼 포스트잇은 6종의 SVG를 사용하고, 각 스티커의 실제 텍스트 가능 영역이 모두 다르다. 단순히 스티커 중앙에 텍스트를 배치하면 다음 문제가 생긴다.

- 스티커 모양에 따라 텍스트가 그림 밖으로 밀린다.
- 작성 모달의 `textarea` 커서 위치와 실제로 보이는 텍스트 위치가 어긋난다.
- 긴 텍스트를 입력할 때 글자 크기만 계속 줄이면 읽기 어렵고, 줄 간격이 크면 제한 글자 수 안에서도 영역을 초과한다.
- 보드에 작게 붙은 스티커와 작성 모달의 큰 미리보기에서 같은 렌더링 기준을 쓰면 한쪽 가독성이 깨진다.

## 해결 방향

스티커별 텍스트 안전 영역을 명시적으로 관리한다. 위치, 크기, 줄 수, 줄당 글자 수를 색상별 설정으로 분리하고, 작성 모달과 보드 표시에서 같은 안전 영역을 사용한다.

핵심 원칙은 다음과 같다.

- 텍스트 위치는 스티커 전체 중앙이 아니라 스티커별 안전 영역 중심을 기준으로 둔다.
- 작성 중에는 실제 `textarea`를 안전 영역 위에 올려 커서와 드래그 선택 위치를 맞춘다.
- 텍스트 길이에 따라 폰트를 계속 줄이지 않고, 고정 글자 크기와 입력 제한으로 영역 초과를 막는다.
- 보드에 붙은 작은 스티커는 `cqw` 단위로 폰트를 계산해 스티커 폭에 비례하게 렌더링한다.

## 구현 파일

- `src/components/rollingPaper/rollingPaperStickerText.ts`: 스티커별 텍스트 안전 영역, 줄 수 계산, 입력 제한 로직
- `src/components/rollingPaper/RollingPaperSticker.tsx`: 스티커 SVG와 텍스트 영역 렌더링
- `src/components/rollingPaper/RollingPaperWriteModal.tsx`: 작성 모달 `textarea` 스타일과 입력 제한 적용
- `src/constants/rollingPaper.ts`: 메시지 최대 길이

## 텍스트 안전 영역

`ROLLING_PAPER_STICKER_TEXT_CONFIG`는 색상별 텍스트 박스 위치와 제약을 가진다.

```ts
type RollingPaperStickerTextConfig = {
  centerX: string;
  centerY: string;
  width: string;
  height: string;
  aspectRatio: number;
  heightRatio: number;
  maxLines: number;
  charsPerLine: number;
};
```

각 필드의 역할은 다음과 같다.

- `centerX`, `centerY`: 스티커 내부 텍스트 박스 중심 위치
- `width`, `height`: 텍스트가 들어갈 수 있는 안전 영역 크기
- `aspectRatio`: 스티커의 세로/가로 비율
- `heightRatio`: 세로 중앙 정렬 계산에 사용하는 텍스트 박스 높이 비율
- `maxLines`: 해당 스티커에서 허용하는 최대 줄 수
- `charsPerLine`: 줄바꿈 예측에 사용하는 줄당 기준 글자 수

## 작성 모달 정렬

작성 모달에서는 `RollingPaperSticker` 내부에 `textarea`를 child로 넣는다. 이때 `RollingPaperSticker`는 내부 `<p>` 텍스트를 렌더링하지 않고, `textarea`가 실제 입력과 표시를 모두 담당한다.

```tsx
<RollingPaperSticker colorId={colorId} message="">
  <textarea
    value={message}
    style={textInputStyle}
    onChange={(event) => updateMessage(event.target.value)}
  />
</RollingPaperSticker>
```

`textarea`는 텍스트 안전 영역 전체를 덮고, `getRollingPaperStickerTextInputStyle`이 글자 크기와 세로 padding을 계산한다.

```ts
const textBlockHeightPx = estimatedLines * FIGMA_MODAL_FONT_SIZE_PX * STICKER_TEXT_LINE_HEIGHT;
const verticalPadding = `max(0px, calc((${textBoxHeightCqw.toFixed(2)}cqw - ${textBlockHeightPx}px) / 2))`;
```

이 방식의 목적은 다음과 같다.

- 한 줄일 때 텍스트가 안전 영역 중앙에 오게 한다.
- 여러 줄일 때 텍스트 블록 전체가 중앙 기준으로 확장되게 한다.
- 실제 입력 커서와 드래그 선택 위치가 표시 텍스트와 같은 좌표에 있게 한다.

## 텍스트 크기와 줄 간격

작성 모달 기준은 다음 값으로 고정한다.

```ts
const FIGMA_MODAL_FONT_SIZE_PX = 11;
const STICKER_TEXT_LINE_HEIGHT = 1.5;
```

초기에는 피그마 기준에 가까운 `line-height: 2`를 사용했지만, 줄 간격이 커서 제한 글자 수 안에서도 텍스트가 안전 영역을 넘는 문제가 있었다. 현재는 `line-height: 1.5`로 줄여 긴 메시지도 더 안정적으로 들어가게 했다.

보드 표시 텍스트는 스티커가 작게 렌더링되기 때문에 고정 `px`가 아니라 컨테이너 폭 기준으로 계산한다.

```ts
fontSize: `clamp(1.79px, ${BOARD_TEXT_FONT_SIZE_CQW}cqw, 12px)`;
```

이 값은 보드에서는 작게 보이고, 포스트잇 포커스 확대 시 함께 커져 읽을 수 있게 만드는 목적이다.

## 보드 배치 스티커 텍스트 표시 개선

### 문제

작성 모달에서는 텍스트가 스티커 안전 영역 안에 들어갔지만, 실제 보드에 작게 배치된 스티커에서는 일부 색상에서 텍스트가 넘치거나 위치가 어색하게 보였다.

특히 다음 문제가 있었다.

- `yellow`, `blue` 스티커는 보드에 작게 렌더링될 때 텍스트 줄이 안전 영역 밖으로 밀려 보였다.
- `yellow` 스티커는 작성 화면 기준으로 맞춰둔 `centerY`를 그대로 사용하면서, 보드에서는 텍스트가 하단으로 치우쳐 보였다.
- `blue`, `purple` 스티커도 작은 보드 렌더링에서는 텍스트가 중앙보다 위아래로 어긋나 보였다.
- 전체 메시지를 작은 스티커 안에 모두 표시하려다 보니, 멀리서 봤을 때 글자가 너무 작고 읽기 어려웠다.
- 반대로 글자 크기만 키우면 긴 메시지가 다시 스티커 영역 밖으로 넘칠 수 있었다.

핵심 원인은 작성 모달, 보드 미리보기, 포커스 확대 화면이 서로 다른 크기와 목적을 가지는데 같은 텍스트 표시 기준을 사용한 것이다.

### 해결

스티커 텍스트 표시 모드를 다음처럼 분리했다.

```ts
export type RollingPaperStickerTextSizeMode = 'default' | 'boardPreview' | 'expanded';
```

각 모드의 역할은 다음과 같다.

- `default`: 메시지 작성 모달에서 사용한다. 입력 커서와 실제 텍스트 위치가 맞아야 하므로 기존 안전 영역과 입력 제한을 유지한다.
- `boardPreview`: 보드에 작게 붙은 스티커와 배치 미리보기에서 사용한다. 메시지는 `20자 + ...`로 줄이고, 멀리서도 보이도록 글자 크기를 더 크게 잡는다.
- `expanded`: 사용자가 스티커를 눌러 확대했을 때 사용한다. 이때는 전체 메시지를 보여줘야 하므로 글자 크기를 보드 미리보기보다 작게 사용한다.

보드 미리보기에서는 다음 값을 사용한다.

```ts
const BOARD_PREVIEW_TEXT_FONT_SIZE_CQW = 8.2;
const EXPANDED_TEXT_FONT_SIZE_CQW = 3.1;
```

보드에 작게 붙은 스티커는 메시지를 전부 보여주지 않고 `20자 + ...`만 보여준다.

```tsx
<RollingPaperSticker
  colorId={note.colorId}
  message={note.message}
  previewMaxLength={20}
  textSizeMode="boardPreview"
/>
```

포커스 확대 상태에서는 `previewMaxLength`를 넘기지 않는다. 따라서 원본 메시지를 그대로 렌더링하고, `textSizeMode="expanded"`로 작은 글자 크기와 줄 간격을 사용한다.

```tsx
<RollingPaperSticker
  colorId={focusedNote.colorId}
  message={focusedNote.message}
  textSizeMode="expanded"
/>
```

### 색상별 보드 정렬 보정

작성 모달의 텍스트 위치는 실제 입력 UX와 연결되어 있으므로 그대로 유지한다. 대신 보드 렌더링에서만 일부 색상의 세로 중심을 보정한다.

```ts
const BOARD_TEXT_CENTER_Y_OVERRIDES: Partial<Record<RollingPaperStickerColorId, string>> = {
  yellow: '54%',
  blue: '50%',
  purple: '50%',
};
```

이 보정은 `sizeMode !== 'default'`일 때만 적용된다.

```ts
const shouldUseBoardPosition = sizeMode !== 'default';
const centerY = shouldUseBoardPosition
  ? (BOARD_TEXT_CENTER_Y_OVERRIDES[colorId] ?? textConfig.centerY)
  : textConfig.centerY;
```

이렇게 분리한 이유는 다음과 같다.

- 작성 모달의 커서 위치와 입력 가능 영역을 흔들지 않는다.
- 보드에 작게 표시되는 스티커만 시각적으로 중앙에 맞춘다.
- 특정 색상 스티커의 그림 여백 차이를 보드 렌더링 기준으로만 보정할 수 있다.
- 확대 상태에서는 전체 메시지 표시를 유지하면서 같은 보드 위치 보정을 사용할 수 있다.

### 성능 영향

이번 수정은 별도의 측정, 레이아웃 재계산 루프, 이미지 리렌더링을 추가하지 않는다.

변경된 동작은 다음 정도다.

- 문자열을 렌더링 전에 한 번 `20자 + ...`로 자른다.
- `textSizeMode`에 따라 CSS 값과 세로 중심 값을 선택한다.
- 기존 `RollingPaperSticker` 컴포넌트를 그대로 재사용한다.

따라서 보드 이동, 확대, 축소 성능에 의미 있는 추가 부담은 없다. 오히려 작은 스티커에서 렌더링하는 텍스트 길이가 줄어들기 때문에 긴 메시지를 전부 그리던 기존 방식보다 보드 렌더링 부담은 줄어든다.

## 입력 제한

현재 메시지 길이 제한은 `ROLLING_PAPER_MAX_MESSAGE_LENGTH = 80`이다.

입력 제한은 두 단계로 처리한다.

1. `textarea`의 `maxLength`로 전체 최대 글자 수를 제한한다.
2. `limitRollingPaperMessageForSticker`에서 스티커별 `maxLines`, `charsPerLine` 기준을 넘는 문자를 잘라낸다.

한글, 영어, 숫자, 공백, 문장부호는 시각적으로 차지하는 폭이 달라서 단순 글자 수 대신 가중치를 사용한다.

```ts
if (/[\u3131-\u318e\uac00-\ud7a3]/.test(character)) return 1;
if (/[a-zA-Z0-9]/.test(character)) return 0.58;
if (/\s/.test(character)) return 0.35;
```

이 계산은 브라우저의 실제 줄바꿈과 완전히 동일하지는 않지만, 입력 단계에서 넘침을 방지하기 위한 가벼운 추정치로 충분하다.

## 커서와 선택 색상

작성 모달의 커서와 드래그 선택 색상은 빨간색이 아니라 파란색 계열로 맞춘다.

```tsx
<textarea className="caret-secondary-blue selection:bg-secondary-blue/20 selection:text-black" />
```

이유는 다음과 같다.

- 빨간 커서는 오류나 경고처럼 보일 수 있다.
- 스티커 색상이 다양하기 때문에 중립적인 포커스 색상이 필요하다.
- 선택 영역이 실제 텍스트 위치와 맞는지 확인하기 쉽다.

## 조정 가이드

스티커 텍스트가 어긋나면 다음 순서로 조정한다.

1. 텍스트가 위아래로 어긋나면 `centerY`를 먼저 조정한다.
2. 텍스트가 좌우로 어긋나면 `centerX`를 조정한다.
3. 텍스트가 그림 영역 밖으로 나가면 `width` 또는 `height`를 줄인다.
4. 입력 가능 글자 수가 너무 적으면 `maxLines`, `charsPerLine`, `STICKER_TEXT_LINE_HEIGHT`를 함께 본다.
5. 작성 모달의 세로 중앙 정렬이 어색하면 `heightRatio`와 `aspectRatio`를 확인한다.

주의할 점은 `width`/`height`만 늘리면 작성 모달에서는 좋아 보여도 보드의 작은 스티커에서 텍스트가 그림 밖으로 나갈 수 있다는 것이다. 작성 모달, 배치 미리보기, 보드 포커스 확대 화면을 함께 확인해야 한다.

## 유지할 원칙

- 스티커별 위치값은 `RollingPaperSticker.tsx`에 직접 넣지 않는다.
- 텍스트 관련 수치는 `rollingPaperStickerText.ts`에 모아 관리한다.
- 작성 모달과 보드 표시가 같은 안전 영역을 사용해야 한다.
- 글자 수가 늘어난다고 폰트를 계속 줄이는 방식은 피한다.
- 보이지 않는 preview 텍스트와 투명 textarea를 겹치는 방식은 사용하지 않는다. 커서 위치와 실제 텍스트 위치가 어긋나기 때문이다.
