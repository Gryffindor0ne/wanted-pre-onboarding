export const formattedDate = (isoDateString: string) => {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 2자리 숫자로 만듭니다.
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const formattedDateString = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    return formattedDateString;
};
