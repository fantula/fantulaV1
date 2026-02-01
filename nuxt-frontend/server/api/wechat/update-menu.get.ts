import { defineEventHandler } from 'h3'
import { getWechatPayConfig } from '~/server/utils/wechat-pay'

const config = useRuntimeConfig()
const appid = config.wechatAppid || config.public.wechatAppid
const secret = config.wechatAppSecret

export default defineEventHandler(async (event) => {
    try {
        // 1. Get Access Token
        const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
        const tokenRes = await fetch(tokenUrl)
        const tokenData = await tokenRes.json()

        if (!tokenData.access_token) {
            return { success: false, message: 'Failed to get access token', error: tokenData }
        }

        // 2. Define Menu Structure
        const menuData = {
            button: [
                {
                    name: "开始使用",
                    sub_button: [
                        {
                            type: "view",
                            name: "进入图拉",
                            url: "https://www.fantula.com/mobile"
                        },
                        {
                            type: "view",
                            name: "我的图拉",
                            url: "https://www.fantula.com/mobile/profile/account"
                        }
                    ]
                },
                {
                    name: "服务中心",
                    sub_button: [
                        {
                            type: "click",
                            name: "联系客服",
                            key: "MENU_CONTACT_SUPPORT"
                        },
                        {
                            type: "view",
                            name: "帮助文档",
                            url: "https://www.fantula.com/mobile/help"
                        }
                    ]
                }
            ]
        }

        // 3. Create Menu
        const createMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${tokenData.access_token}`
        const createRes = await fetch(createMenuUrl, {
            method: 'POST',
            body: JSON.stringify(menuData),
            headers: { 'Content-Type': 'application/json' }
        })
        const createResult = await createRes.json()

        return {
            success: createResult.errcode === 0,
            result: createResult,
            menu: menuData
        }

    } catch (e: any) {
        return {
            success: false,
            message: e.message
        }
    }
})
