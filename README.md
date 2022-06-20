# custom-input-exercise

Nothing but an exercise

## Instructions

1. Run `npm install` to install packages
2. Run test `npm test`
3. Run dev `npm start`
4. Run build `npm run build` to get production ready
   - The production build at `dist/`

## Requirement

- [ ] CustomInputNumber component
  - [x] style
  - [x] support `min`, `max`, `step`, `name`, `value`, `onChange`, `onBlur`, `disabled`
  - [x] support long press
  - [ ] spec validation
- [ ] RoomAllocation component
  - [ ] spec validation

## Technical Stack

- [x] NPM
- [x] ESLint
- [x] Webpack, Babel
- [x] React
- [x] Redux + Redux Toolkit
- [x] Jest

## Review

主要有下列的問題：
- clearInterval 無法正確執行
- Input 輸入時執行異常
