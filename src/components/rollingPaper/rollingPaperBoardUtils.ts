import { ApiClientError } from '@/apis';
import { getRollingPaperPerformanceNotesFromSearch } from '@/mocks/rollingPaperPerformance';
import type { PlacedRollingPaperNote } from '@/lib/rollingPaperLayout';
import { POSTIT_BOARD_FULL_ERROR_CODES } from './rollingPaperBoardConstants';

export function getInitialRollingPaperPlacedNotes() {
  if (!import.meta.env.DEV || typeof window === 'undefined') {
    return [];
  }

  return getRollingPaperPerformanceNotesFromSearch(window.location.search);
}

export function isRollingPaperNoteInChannel(
  note: PlacedRollingPaperNote,
  categoryId: string,
  channelId: string,
) {
  if (!note.categoryId || !note.channelId) {
    return true;
  }

  return note.categoryId === categoryId && note.channelId === channelId;
}

export function isExpiredLocalRollingPaperNote(note: PlacedRollingPaperNote, now = Date.now()) {
  return Boolean(note.pendingVisibleUntil && note.pendingVisibleUntil <= now);
}

export function isSameRollingPaperConflictPlaceholder(
  note: PlacedRollingPaperNote,
  nextNote: PlacedRollingPaperNote,
) {
  return (
    note.isConflictPlaceholder &&
    note.boardId === nextNote.boardId &&
    note.boardVariant === nextNote.boardVariant &&
    Math.abs(note.x - nextNote.x) < 0.01 &&
    Math.abs(note.y - nextNote.y) < 0.01
  );
}

export function isRollingPaperBoardFullError(error: unknown) {
  if (!(error instanceof ApiClientError)) {
    return false;
  }

  if (
    error.code &&
    POSTIT_BOARD_FULL_ERROR_CODES.some((boardFullCode) => boardFullCode === error.code)
  ) {
    return true;
  }

  const normalizedMessage = error.message.toLowerCase();
  return [
    '보드에 메시지가 가득',
    '보드가 가득',
    '더 이상 작성할 수',
    '정원이 가득',
    '정원 초과',
    'board full',
    'board capacity',
    'maxnotecount',
    'note count',
  ].some((keyword) => normalizedMessage.includes(keyword));
}
