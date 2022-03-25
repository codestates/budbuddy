/*eslint-disable */

export function validEmail(email) {
  const regExp = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9\.kr]+/g;
  return regExp.test(email);
}

export function validId(id) {
  if (checkHangul(id)) return false;
  if (checkSpace(id)) return false;
  const regExp = /^[a-zA-Z][a-zA-Z0-9]{4,15}$/g;
  return regExp.test(id);
}

//영문, 특수문자, 숫자 사용가능하며 총6~16글자 사이여야합니다
export function validPassword(password) {
  if (checkSpace(password)) return false;
  const regExp = /^[A-Za-z0-9\W]{6,16}$/g;
  return regExp.test(password);
}
//완성된 한글 영문 숫자만 사용 가능하며 1~14글자 사이여야합니다
export function validNickName(nickname) {
  if (checkSpace(nickname)) return false;

  const regExp = /^[가-힣a-zA-Z0-9]{1,14}$/gm;
  const isValid = regExp.test(nickname);
  return isValid;
}

function checkSpace(str) {
  const space = /\s/g;
  return space.test(str);
}

export function checkHangul(str) {
  const kor = /[ㄱ-ㅎ가-힣]/g;
  return kor.test(str);
}
