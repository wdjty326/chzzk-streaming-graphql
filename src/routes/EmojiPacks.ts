import { GraphQLResolveInfo } from 'graphql';
import https from 'https';
import { APIBase, APIBaseDefault, APIResponseCode } from 'src/defines/Response';

export interface APIResponse {
	code: APIResponseCode;
}

const createResponseBody = function <T>(code: APIResponseCode, message: string, data: T | null = null) {
	return JSON.stringify({
		code,
		message,
		data,
	} as APIResponse);
};

const getEmojiPacks = (channelId: string) => {
	return new Promise((resolve, reject) => {
		const req = https.request({
			method: 'GET',

			hostname: APIBase,
			path: `/service/v1/channels/${channelId}/emoji-packs`,
			port: 443,
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Origin': 'https://chzzk.naver.com',
				'Referer': `https://chzzk.naver.com/live/${channelId}`,
				'Front-Client-Platform-Type': 'PC',
				'Front-Client-Product-Type': 'web',
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
			}
		}, (res) => {
			const chunks: any[] = [];
			res.setEncoding('utf8');
			res.on('data', (data) => {
				chunks.push(data);
			});
			res.on('end', () => {
				const responseText = chunks.join('');
				resolve(JSON.parse(responseText));
			});
		});

		req.on('error', reject);
		req.end();
	});
};

const getEmojis = (channelId: string) => {
	return new Promise((resolve, reject) => {
		const req = https.request({
			method: "GET",
			host: APIBaseDefault,
			path: `/nng_main/nng_comment_api/v1/emojis`,
			port: 443,
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Origin': 'https://chzzk.naver.com',
				'Referer': `https://chzzk.naver.com/live/${channelId}`,
				'Front-Client-Platform-Type': 'PC',
				'Front-Client-Product-Type': 'web',
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
			}
		}, (res) => {
			const chunks: any[] = [];
			res.setEncoding('utf8');
			res.on('data', (data) => {
				chunks.push(data);
			});
			res.on('end', () => {
				const responseText = chunks.join('');
				resolve(JSON.parse(responseText));
			});
		});

		req.on('error', reject);
		req.end();
	});
};

export default async (parent: any, args: any, contextValue: any, info: GraphQLResolveInfo) => {
	try {
		return createResponseBody(APIResponseCode.EMPTY_CHZZK_CHANNEL_ID, '');

		// const queryStringParameters = event.queryStringParameters;
		// if (!queryStringParameters || !queryStringParameters.channelId) {
		// 	return createResponseBody(APIResponseCode.EMPTY_CHZZK_CHANNEL_ID, '');
		// }

		const channelId = args.channelId;

		const emojiPacksData = await getEmojiPacks(channelId);
		if (!emojiPacksData || (emojiPacksData as any).code !== 200) {
			return createResponseBody(APIResponseCode.NOTFOUND_LIVE_DETAIL, '');
		}

		const emojiData = await getEmojis(channelId);
		if (!emojiData) {
			return createResponseBody(APIResponseCode.NOTFOUND_LIVE_DETAIL, '');
		}

		return createResponseBody(APIResponseCode.SUCCESS, '', {
			emojiPacks: (emojiPacksData as any).content.emojiPacks,
			subscriptionEmojiPacks: (emojiPacksData as any).content.subscriptionEmojiPacks,
			commonPacks: (emojiData as any).content.emojis,
		});
	} catch (e) {
		console.error(e);
		return {
			statusCode: 400,
			headers: {
				'Access-Control-Allow-Methods': 'GET',
				'Access-Control-Allow-Origin': 'https://toon.at, https://*.toon.at',
			},
			body: e instanceof Error ? e.message : '',
		};
	}
};