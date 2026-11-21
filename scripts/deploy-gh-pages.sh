#!/usr/bin/env bash
# GitHub Actions를 쓰지 않고 dist/만 gh-pages 브랜치로 올리는 대체 배포 스크립트.
#
#   npm run deploy:gh-pages
#
# 사전 조건
#   1) GitHub에서 저장소를 만들고 원격(origin)을 연결했을 때
#   2) Settings → Pages → Source를 "Deploy from a branch" → gh-pages / (root) 로 지정
set -euo pipefail

cd "$(dirname "$0")/.."

REMOTE="${REMOTE:-$(git remote get-url origin 2>/dev/null || true)}"
if [ -z "$REMOTE" ]; then
  echo "origin 원격이 없습니다. 먼저 저장소를 만들고 연결하세요:"
  echo "  git remote add origin https://github.com/<계정>/shye-portfolio.git"
  exit 1
fi

echo "▶ 빌드"
npm run build

echo "▶ dist/를 gh-pages 브랜치로 푸시"
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-shye}" -c user.email="${GIT_AUTHOR_EMAIL:-shye@users.noreply.github.com}" \
  commit -qm "deploy: $(date '+%Y-%m-%d %H:%M')"
git push -f "$REMOTE" gh-pages
rm -rf .git

echo "✅ 완료 — Settings → Pages 에서 Source를 gh-pages / (root)로 지정하세요."
