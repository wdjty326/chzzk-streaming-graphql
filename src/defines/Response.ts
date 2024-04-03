
export const APIBase = 'api.chzzk.naver.com';
export const APIBaseDefault = 'apis.naver.com';

export enum APIResponseCode {
	EMPTY_CHZZK_CHANNEL_ID = -1001, /// 치지직 채널 ID가 비었습니다.
	NOTFOUND_LIVE_DETAIL = -1002, /// 치지직 채널 ID로 정보를 찾을 수 없습니다.
	NOTFOUND_LIVE_STATUS = -1003, /// 치지직 채널 ID로 정보를 찾을 수 없습니다.

	FAILED_CHATS_ACCESS_TOKEN = -1004, /// 채팅토큰을 가져오지 못했습니다.

	SUCCESS = 0, /// 성공
}
