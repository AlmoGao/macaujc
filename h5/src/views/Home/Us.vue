<!-- 联系我们 -->
<template>
    <div class="page-us">
        <img class="logo" src="@/assets/macaujc.png" alt="logo">
        <Top />
        <div class="us">
            <div class="title">联系我们</div>
            <div class="subtitle">彩种上架、广告业务、反馈BUG、投诉建议、联系澳门六合彩官方邮件。24小时内可以取得回复。</div>
            <img class="email" src="@/assets/email.png" alt="email">
            <div>E-mail: server@macaujc.com</div>
        </div>
    </div>
</template>


<script setup>
import Top from "@/components/Top.vue"


</script>

<style lang="less" scoped>
.page-us {
    padding: 2rem 0;

    .logo {
        height: 8rem;
    }

    .us {
        padding: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .title {
            font-size: 22px;
            margin-bottom: 4rem;
        }

        .email {
            margin: 8rem 0 2rem 0;
            width: 10rem;
            height: 10rem;
        }
    }
}
</style>