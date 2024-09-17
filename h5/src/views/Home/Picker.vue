<!-- 挑码助手 -->
<template>
    <div class="page-picker">
        <img class="logo" src="@/assets/macaujc.png" alt="logo">
        <Top />

        <div class="content">
            <div class="item">
                <div class="item_title">挑码结果</div>
                <div class="item_content">
                    <Num class="item_c_n" :num="'01'" />
                    <Num class="item_c_n" :num="'02'" />
                    <Num class="item_c_n" :num="'03'" />
                    <Num class="item_c_n" :num="'09'" />
                </div>
                <div class="item_btns">
                    <div class="btn">复制</div>
                    <div class="btn">清空</div>
                </div>
            </div>
            <div style="width:20px;height:1px"></div>
            <div class="item">
                <div class="item_title">挑码</div>

                <div class="item_block" style="padding-top:0">
                    <div class="item_block_btn">单</div>
                    <div class="item_block_btn">双</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn">大</div>
                    <div class="item_block_btn">小</div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn">合单</div>
                    <div class="item_block_btn">大单</div>
                    <div class="item_block_btn">小单</div>
                    <div class="item_block_btn">合大</div>
                    <div class="item_block_btn">尾大</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn">合双</div>
                    <div class="item_block_btn">大双</div>
                    <div class="item_block_btn">小双</div>
                    <div class="item_block_btn">合小</div>
                    <div class="item_block_btn">尾小</div>
                    <div class="item_block_btn hidden_btn"></div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn">红波</div>
                    <div class="item_block_btn">蓝波</div>
                    <div class="item_block_btn">绿波</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn">红单</div>
                    <div class="item_block_btn">红双</div>
                    <div class="item_block_btn">蓝单</div>
                    <div class="item_block_btn">蓝双</div>
                    <div class="item_block_btn">绿单</div>
                    <div class="item_block_btn">绿双</div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn">鼠</div>
                    <div class="item_block_btn">猪</div>
                    <div class="item_block_btn">狗</div>
                    <div class="item_block_btn">鸡</div>
                    <div class="item_block_btn">猴</div>
                    <div class="item_block_btn">牛</div>
                    <div class="item_block_btn">羊</div>
                    <div class="item_block_btn">马</div>
                    <div class="item_block_btn">蛇</div>
                    <div class="item_block_btn">龙</div>
                    <div class="item_block_btn">兔</div>
                    <div class="item_block_btn">虎</div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn">0头</div>
                    <div class="item_block_btn">1头</div>
                    <div class="item_block_btn">2头</div>
                    <div class="item_block_btn">3头</div>
                    <div class="item_block_btn">4头</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn">0尾</div>
                    <div class="item_block_btn">1尾</div>
                    <div class="item_block_btn">2尾</div>
                    <div class="item_block_btn">3尾</div>
                    <div class="item_block_btn">4尾</div>
                    <div class="item_block_btn">5尾</div>
                    <div class="item_block_btn">6尾</div>
                    <div class="item_block_btn">7尾</div>
                    <div class="item_block_btn">8尾</div>
                    <div class="item_block_btn">9尾</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
import Top from "@/components/Top.vue"
import Num from "@/components/Num.vue"
</script>

<style lang="less" scoped>
.page-picker {
    padding: 2rem 0;

    .logo {
        height: 8rem;
    }

    .content {
        padding: 2rem 0;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        .item {
            min-width: 350px;
            flex: 1;

            .item_title {
                border-left: 4px solid #1a3d96;
                padding-left: 1rem;
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 2rem;
            }

            .item_content {
                width: 100%;
                min-height: 30rem;
                border-radius: 1rem;
                border: 1px solid #aaa;
                padding: 2rem;
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                justify-content: flex-start;

                .item_c_n {
                    margin: 0 1rem 1rem 0;
                }
            }

            .item_block {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 0 0 0;
                border-bottom: 1px solid #aaa;

                .item_block_btn {
                    padding: 0.5rem 0;
                    width: 15%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.5rem;
                    border: 1px solid #aaa;
                    cursor: pointer;
                    margin-bottom: 1rem;
                }

                .hidden_btn {
                    opacity: 0;
                }
            }

            .item_btns {
                margin-top: 2rem;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .btn {
                    padding: 1rem 2rem;
                    margin-left: 2rem;
                    border-radius: 1rem;
                    border: 1px solid #aaa;
                    cursor: pointer;
                }
            }
        }
    }

}

@media screen and (max-width: 600px) {
    .page-picker {
        .content {
            padding: 2rem
        }
    }
}
</style>