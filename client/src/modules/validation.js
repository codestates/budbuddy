/*eslint-disable */

export function validEmail(email) {
  const regExp = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9\.kr]+/g;
  return regExp.test(email);
}

export function validId(id) {
  id = removeHangul(id);
  id = removeSpace(id);
  const regExp = /^[a-zA-Z][a-zA-Z0-9]{4,15}$/g;
  return regExp.test(id);
}

//영문, 특수문자, 숫자 사용가능하며 총6~16글자 사이여야합니다
export function validPassword(password) {
  password = removeSpace(password);
  const regExp = /^[A-Za-z0-9\W]{6,16}$/g;
  return regExp.test(password);
}
//첫글자는 영문이며 숫자 사용가능하지만\n 특수문자 및 한글 사용 불가입니다
export function validNickName(nickname) {
  nickname = removeSpace(nickname);
  const regExp = /^[A-Za-z][^\W\s]{1,}[a-zA-Z0-9]*$/g;
  return regExp.test(nickname);
}

function removeSpace(str) {
  let space = /\s/g;

  if (space.test(str)) {
    return str.replace(/[\s]/g, "");
  } else {
    return str;
  }
}

export function removeHangul(str) {
  let kor = /[ㄱ-ㅎ가-힣]/g;

  if (kor.test(str)) {
    return str.replace(/[ㄱ-ㅎ가-힣]/g, "");
  } else {
    return str;
  }
}
