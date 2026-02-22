import { ref, computed, watch } from 'vue'
import { getSupabaseClient } from '@/utils/supabase'

interface CdkItem {
    id: string
    code: string
    parsed: any
    accountData: any
}

export interface CoSharingUser {
    id: string
    avatar: string | null
    nickname: string | null
    slot_index: number
}

export function useCoSharing(options: {
    cdkItem: () => CdkItem
    slotIndex: () => number
    onCopySuccess: (msg: string) => void
}) {
    const coSharingUsers = ref<CoSharingUser[]>([])

    const maxSlots = computed(() => {
        const item = options.cdkItem()
        if (!item) return 5
        if (item.accountData && item.accountData.max_slots) {
            return Number(item.accountData.max_slots)
        }
        return 5
    })

    const mySlotIndex = computed(() => options.slotIndex())

    const allSlots = computed(() => {
        const slots = []
        for (let i = 1; i <= maxSlots.value; i++) {
            const user = coSharingUsers.value.find(u => u.slot_index === i)
            const isMe = (i === Number(mySlotIndex.value))
            slots.push({ index: i, user, isMe })
        }
        return slots
    })

    const occupiedCount = computed(() => coSharingUsers.value.length)

    const parseCdkCode = (item: CdkItem) => {
        if (!item) return {}
        if (item.parsed && typeof item.parsed === 'object') return item.parsed
        try {
            return JSON.parse(item.code)
        } catch {
            return { '激活码': item.code }
        }
    }

    const copyText = (t: string) => {
        navigator.clipboard.writeText(t).then(() => options.onCopySuccess('已复制'))
    }

    const formatSlotIndex = (idx?: number) => {
        if (idx === undefined) return '--'
        return String(idx).padStart(2, '0')
    }

    const fetchCoSharingUsers = async () => {
        const item = options.cdkItem()
        if (!item || !item.id) return
        const cdkId = item.id

        try {
            const client = getSupabaseClient()
            const { data, error } = await client
                .from('slot_occupancies')
                .select(`
          user_id,
          slot_index,
          profiles:user_id (id, avatar, nickname)
        `)
                .eq('cdk_id', cdkId)
                .eq('status', 'using')
                .not('user_id', 'is', null)

            if (!error && data) {
                coSharingUsers.value = data
                    .filter((row: any) => row.profiles)
                    .map((row: any) => ({
                        id: row.profiles.id,
                        avatar: row.profiles.avatar,
                        nickname: row.profiles.nickname,
                        slot_index: row.slot_index
                    }))
            }
        } catch (err) {
            if (import.meta.dev) console.error('获取共享用户失败:', err)
        }
    }

    watch(() => options.cdkItem(), () => {
        fetchCoSharingUsers()
    }, { deep: true })

    return {
        coSharingUsers,
        maxSlots,
        mySlotIndex,
        allSlots,
        occupiedCount,
        parseCdkCode,
        copyText,
        formatSlotIndex,
        fetchCoSharingUsers
    }
}
