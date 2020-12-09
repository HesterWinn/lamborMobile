export default {
    Web: {
        recharge: {
        	//充值中心
            0: {
                Ret: false,
                RedirectName: 'login'
            },
            3: {
                Ret: true
            },
            4: {
                Ret: true
            }
        },
        member: {
            // 會員 - 個人中心總覽
            0: {
                Ret: false,
                RedirectName: 'login'
            },
            3: {
                Ret: true
            },
            4: {
                Ret: true
            }
        },
        transactionRecord: {
            // 會員 - 记录查询
            0: {
                Ret: false,
                RedirectName: 'login'
            },
            3: {
                Ret: true
            },
            4: {
                Ret: true
            }
        },
        extendRecord: {
            // 會員 - 推广查询
            0: {
                Ret: false,
                RedirectName: 'login'
            },
            3: {
                Ret: true
            },
            4: {
                Ret: true
            }
        },
        privateMessage: {
            // 會員 - 公告信息
            0: {
                Ret: false,
                RedirectName: 'login'
            },
            3: {
                Ret: true
            },
            4: {
                Ret: true
            }
        },
        modifyPassword: {
            // 會員 - 修改密码
            0: {
                Ret: false,
                RedirectName: 'login'
            },
            3: {
                Ret: true
            },
            4: {
                Ret: true
            }
        },
    },
};