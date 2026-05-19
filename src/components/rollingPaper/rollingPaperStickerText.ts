import type { CSSProperties } from 'react';
import type { RollingPaperStickerColorId } from '@/constants/rollingPaper';

type RollingPaperStickerTextStyle = Pick<
  CSSProperties,
  'fontSize' | 'letterSpacing' | 'lineHeight'
>;

export type RollingPaperStickerTextSizeMode = 'default' | 'boardPreview' | 'expanded';

type RollingPaperStickerTextInputStyle = RollingPaperStickerTextStyle &
  Pick<CSSProperties, 'boxSizing'> & {
    paddingTop: string;
    paddingBottom: string;
  };

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

const FIGMA_MODAL_FONT_SIZE_PX = 11;
const STICKER_TEXT_LINE_HEIGHT = 1.5;
const BOARD_TEXT_FONT_SIZE_CQW = 5.7;
const BOARD_PREVIEW_TEXT_FONT_SIZE_CQW = 8.2;
const EXPANDED_TEXT_FONT_SIZE_CQW = 3.1;

const BOARD_TEXT_CENTER_Y_OVERRIDES: Partial<Record<RollingPaperStickerColorId, string>> = {
  yellow: '54%',
  blue: '50%',
  purple: '50%',
};

export const ROLLING_PAPER_STICKER_TEXT_CONFIG: Record<
  RollingPaperStickerColorId,
  RollingPaperStickerTextConfig
> = {
  red: {
    centerX: '50%',
    centerY: '55%',
    width: '60.5%',
    height: '55%',
    aspectRatio: 250 / 271,
    heightRatio: 0.55,
    maxLines: 7,
    charsPerLine: 15,
  },
  yellow: {
    centerX: '50%',
    centerY: '62%',
    width: '56%',
    height: '65%',
    aspectRatio: 270 / 274,
    heightRatio: 0.45,
    maxLines: 7,
    charsPerLine: 17,
  },
  green: {
    centerX: '50%',
    centerY: '38%',
    width: '62%',
    height: '42%',
    aspectRatio: 361 / 253,
    heightRatio: 0.38,
    maxLines: 8,
    charsPerLine: 13,
  },
  blue: {
    centerX: '50%',
    centerY: '45.5%',
    width: '60%',
    height: '69%',
    aspectRatio: 230 / 326,
    heightRatio: 0.7,
    maxLines: 6,
    charsPerLine: 18,
  },
  purple: {
    centerX: '50%',
    centerY: '55%',
    width: '63%',
    height: '55%',
    aspectRatio: 230 / 259,
    heightRatio: 0.5,
    maxLines: 6,
    charsPerLine: 17,
  },
  pink: {
    centerX: '50%',
    centerY: '53%',
    width: '60%',
    height: '50%',
    aspectRatio: 271 / 271,
    heightRatio: 0.42,
    maxLines: 6,
    charsPerLine: 17,
  },
};

export function getRollingPaperStickerTextConfig(colorId: RollingPaperStickerColorId) {
  return ROLLING_PAPER_STICKER_TEXT_CONFIG[colorId] ?? ROLLING_PAPER_STICKER_TEXT_CONFIG.red;
}

export function getRollingPaperStickerTextBoxStyle(
  colorId: RollingPaperStickerColorId,
  sizeMode: RollingPaperStickerTextSizeMode = 'default',
): CSSProperties {
  const textConfig = getRollingPaperStickerTextConfig(colorId);
  const shouldUseBoardPosition = sizeMode !== 'default';
  const centerY = shouldUseBoardPosition
    ? (BOARD_TEXT_CENTER_Y_OVERRIDES[colorId] ?? textConfig.centerY)
    : textConfig.centerY;

  return {
    left: textConfig.centerX,
    top: centerY,
    width: textConfig.width,
    height: textConfig.height,
    transform: 'translate(-50%, -50%)',
  };
}

function getCharacterWeight(character: string) {
  if (/\s/.test(character)) {
    return 0.35;
  }

  if (/[\u3131-\u318e\uac00-\ud7a3]/.test(character)) {
    return 1;
  }

  if (/[a-zA-Z0-9]/.test(character)) {
    return 0.58;
  }

  if (/[.,!?'"“”‘’()[\]{}:;]/.test(character)) {
    return 0.38;
  }

  return 1.15;
}

function getWeightedTextLength(text: string) {
  return [...text].reduce((length, character) => length + getCharacterWeight(character), 0);
}

function getEstimatedLineCount(message: string, charsPerLine: number) {
  return message.split('\n').reduce((lineCount, line) => {
    return lineCount + Math.max(1, Math.ceil(getWeightedTextLength(line) / charsPerLine));
  }, 0);
}

function getLineBreakFilledTextLength(message: string, charsPerLine: number) {
  if (!message) {
    return 0;
  }

  const lines = message.split('\n');

  return Math.ceil(
    lines.reduce((totalLength, line, lineIndex) => {
      const lineLength = getWeightedTextLength(line);

      if (lineIndex === lines.length - 1) {
        return totalLength + lineLength;
      }

      return totalLength + Math.max(1, Math.ceil(lineLength / charsPerLine)) * charsPerLine;
    }, 0),
  );
}

function getRollingPaperStickerEstimatedLines(
  message: string,
  colorId: RollingPaperStickerColorId,
) {
  const textConfig = getRollingPaperStickerTextConfig(colorId);
  const measuredMessage = message || ' ';

  return Math.min(
    getEstimatedLineCount(measuredMessage, textConfig.charsPerLine),
    textConfig.maxLines,
  );
}

export function getRollingPaperStickerTextStyle(
  message: string,
  colorId: RollingPaperStickerColorId,
  sizeMode: RollingPaperStickerTextSizeMode = 'default',
): RollingPaperStickerTextStyle {
  void message;
  void colorId;

  const fontSizeCqw =
    sizeMode === 'expanded'
      ? EXPANDED_TEXT_FONT_SIZE_CQW
      : sizeMode === 'boardPreview'
        ? BOARD_PREVIEW_TEXT_FONT_SIZE_CQW
        : BOARD_TEXT_FONT_SIZE_CQW;
  const minFontSize = sizeMode === 'expanded' ? 2.6 : 3;
  const maxFontSize = sizeMode === 'expanded' ? 12 : 14;
  const lineHeight =
    sizeMode === 'boardPreview' ? 1.35 : sizeMode === 'expanded' ? 1.45 : STICKER_TEXT_LINE_HEIGHT;

  return {
    fontSize: `clamp(${minFontSize}px, ${fontSizeCqw}cqw, ${maxFontSize}px)`,
    letterSpacing: '-0.03em',
    lineHeight: String(lineHeight),
  };
}

export function getRollingPaperStickerTextInputStyle(
  message: string,
  colorId: RollingPaperStickerColorId,
): RollingPaperStickerTextInputStyle {
  const textConfig = getRollingPaperStickerTextConfig(colorId);
  const estimatedLines = getRollingPaperStickerEstimatedLines(message, colorId);
  const textBoxHeightCqw = textConfig.heightRatio * textConfig.aspectRatio * 100;
  const textBlockHeightPx = estimatedLines * FIGMA_MODAL_FONT_SIZE_PX * STICKER_TEXT_LINE_HEIGHT;
  const verticalPadding = `max(0px, calc((${textBoxHeightCqw.toFixed(2)}cqw - ${textBlockHeightPx}px) / 2))`;

  return {
    fontSize: `${FIGMA_MODAL_FONT_SIZE_PX}px`,
    letterSpacing: '-0.02em',
    lineHeight: String(STICKER_TEXT_LINE_HEIGHT),
    boxSizing: 'border-box',
    paddingTop: verticalPadding,
    paddingBottom: verticalPadding,
  };
}

export function getRollingPaperStickerMessageLength(
  message: string,
  colorId: RollingPaperStickerColorId,
) {
  const textConfig = getRollingPaperStickerTextConfig(colorId);

  return Math.max(message.length, getLineBreakFilledTextLength(message, textConfig.charsPerLine));
}

export function doesRollingPaperMessageFitSticker(
  message: string,
  colorId: RollingPaperStickerColorId,
) {
  const textConfig = getRollingPaperStickerTextConfig(colorId);

  return getEstimatedLineCount(message || ' ', textConfig.charsPerLine) <= textConfig.maxLines;
}

export function limitRollingPaperMessageForSticker(
  message: string,
  colorId: RollingPaperStickerColorId,
  maxLength: number,
) {
  let nextMessage = message.slice(0, maxLength);

  while (
    nextMessage.length > 0 &&
    (!doesRollingPaperMessageFitSticker(nextMessage, colorId) ||
      getRollingPaperStickerMessageLength(nextMessage, colorId) > maxLength)
  ) {
    nextMessage = nextMessage.slice(0, -1);
  }

  return nextMessage;
}
