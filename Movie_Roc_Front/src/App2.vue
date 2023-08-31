<template> 
    <el-container class="home_container">
      <el-header style="background: linear-gradient(to right,#b2e5da,rgb(234, 187, 187))">
        <img v-if="!isMobile" alt="Vue logo" style="margin-left: 1dvw; border-radius: 100px;" src="@/assets/M01logo1.png" width="50" height="50" />
        <img v-else alt="Vue logo" style="margin-left: 1dvw; border-radius: 100px;" src="@/assets/M01logo1.png" width="30" height="30" />
        
        <h1 v-if="!isMobile" style="margin-left:1.5vw;margin-right: auto;color: hwb(240 39% 53%);font-weight: bold; font-style: italic;">M01_Group</h1>
        <h1 v-else style="font-size: small; margin-left:1.5vw;margin-right: auto;color: hwb(240 39% 53%);font-weight: bold; font-style: italic;">M01_Group</h1>

        <h1 v-if="!isMobile" style="margin-left: 0;color: hwb(240 25% 62%);font-weight: bold; ">电影推荐大模型体验系统</h1>
        <h1 v-else style="font-size: medium; margin-left: auto;color: hwb(240 25% 62%);font-weight: bold; ">电影推荐移动端体验Demo</h1>
        
        <el-button v-if="!isMobile" type="info" style="font-size: medium; font-style: italic;font-weight: bold;color: #3795d8; border:none;background-color: transparent ; margin-left: auto;" @click="drawer = true">
            开发团队
        </el-button>
        <el-button v-else type="info" style="font-size: small; font-style: italic;font-weight: bold;color: #3795d8; border:none;background-color: transparent ; margin-left: auto;" @click="Move_drawer = true">
            开发团队
        </el-button>

        <el-drawer v-if="!isMobile" v-model="drawer"  :with-header="false" style=" background: linear-gradient(#b2e5da,rgb(169, 225, 154))">
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar  :src="ZhouAvaterUrl" style=""/></div>   
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">周子昱-西安电子科技大学</div>
                    <div class="Personnal_info">
                    来自人工智能学院，计算机科学与技术专业，负责团队统筹，算法框架设计、分级反馈模块开发。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="ZZXAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">张振兴-合肥工业大学</div>
                    <div class="Personnal_info">
                    来自计算机与信息学院，计算机科学与技术专业，负责团队的前端开发及前后端连接部分。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="ZJFAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">张佳凡-西安电子科技大学</div>
                    <div class="Personnal_info">
                    来自人工智能学院，人工智能专业，负责团队的后端prompt设计工作。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="WJDAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">吴继达-井冈山大学</div>
                    <div class="Personnal_info">
                    来自电子信息工程学院，软件工程专业，负责团队的后端整体开发及系统部署工作。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="LMSAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">李明帅-西北工业大学</div>
                    <div class="Personnal_info">
                    来自自动化学院，电子信息专业，负责知识库检索模块开发、关键字提取模块开发。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="SCTAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">宋长天-武汉理工大学</div>
                    <div class="Personnal_info">
                    来自计算机与人工智能学院，计算机科学与技术专业，负责关键字提取模块开发。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="CQDAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">蔡庆东-东南大学</div>
                    <div class="Personnal_info">
                    来自信息科学与工程学院，电子信息专业，负责知识库检索模块开发、关键字提取模块开发。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="DKAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">邓凯-湖南大学</div>
                    <div class="Personnal_info">
                    来自工程管理学院，信息管理与信息系统专业，负责团队的测试部分及其他工作。
                    </div>
                </div>
            </div>
        </el-drawer>
        <el-drawer v-else :size="DrawSize" v-model="Move_drawer"  :with-header="false" style=" background: linear-gradient(#b2e5da,rgb(169, 225, 154))">
            <div style="font-weight: bold; font-style: italic;" @click="Move_drawer=false">返回</div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar  :src="ZhouAvaterUrl" style=""/></div>   
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">周子昱-西安电子科技大学</div>
                    <div class="Personnal_info">
                    来自人工智能学院，计算机科学与技术专业，负责团队统筹，算法框架设计、分级反馈模块开发。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="ZZXAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">张振兴-合肥工业大学</div>
                    <div class="Personnal_info">
                    来自计算机与信息学院，计算机科学与技术专业，负责团队的前端开发及前后端连接部分。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="ZJFAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">张佳凡-西安电子科技大学</div>
                    <div class="Personnal_info">
                    来自人工智能学院，人工智能专业，负责团队的后端prompt设计工作。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="WJDAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">吴继达-井冈山大学</div>
                    <div class="Personnal_info">
                    来自电子信息工程学院，软件工程专业，负责团队的后端整体开发及系统部署工作。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="LMSAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">李明帅-西北工业大学</div>
                    <div class="Personnal_info">
                    来自自动化学院，电子信息专业，负责知识库检索模块开发、关键字提取模块开发。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="SCTAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">宋长天-武汉理工大学</div>
                    <div class="Personnal_info">
                    来自计算机与人工智能学院，计算机科学与技术专业，负责关键字提取模块开发。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="CQDAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">蔡庆东-东南大学</div>
                    <div class="Personnal_info">
                    来自信息科学与工程学院，电子信息专业，负责知识库检索模块开发、关键字提取模块开发。
                    </div>
                </div>
            </div>
            <div class="MemberIntro" style="background-color: aliceblue;">
                <div class="Avater"><el-avatar :src="DKAvaterUrl"  style=""/></div>
                <div class="Intro" style="color: black;">
                    <div class="Name" style="font-weight: bold; font-style: italic;">邓凯-湖南大学</div>
                    <div class="Personnal_info">
                    来自工程管理学院，信息管理与信息系统专业，负责团队的测试部分及其他工作。
                    </div>
                </div>
            </div>
        </el-drawer>
        </el-header>
      <el-main ><RouterView /></el-main>
    </el-container>
    
  </template>
  <script lang="ts">
    import ZhouAvaterUrl from './assets/ZhouAvater.jpg'
    import ZZXAvaterUrl from './assets/ZZXAvater.jpg'
    import ZJFAvaterUrl from './assets/ZJFAvater.png'
    import WJDAvaterUrl from './assets/WJDAvater.jpg'
    import LMSAvaterUrl from './assets/LMSAvater.jpg'
    import SCTAvaterUrl from './assets/sct.jpg'
    import CQDAvaterUrl from './assets/CQDAvater.jpg'
    import DKAvaterUrl from './assets/DKAvater.jpg'

    import { RouterLink, useRouter } from 'vue-router';
    const router = useRouter();
  
    const navigateToChat = () => {
      router.push('/chat')
    }
    export default{
        data() {
            return{
                DrawSize: '100vw',
                isMobile: false,
                DKAvaterUrl:DKAvaterUrl,
                CQDAvaterUrl:CQDAvaterUrl,
                SCTAvaterUrl:SCTAvaterUrl,
                LMSAvaterUrl:LMSAvaterUrl,
                WJDAvaterUrl:WJDAvaterUrl,
                ZJFAvaterUrl:ZJFAvaterUrl,
                ZZXAvaterUrl:ZZXAvaterUrl,
                ZhouAvaterUrl:ZhouAvaterUrl,
                drawer: true,
                Move_drawer:false
            }
        },
        mounted(){
            this.isMobile = this.is_Mobile()
        },
        methods:{
            is_Mobile(){
                if(window.navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
                    return true; // 移动端
                }else{
                    return false; // PC端
                }
            },
        }
    }
  </script>
  
  <style>
  .Member_Mobile{
    width: 90vw;
  }
  .Avater{
    width: 60px;
    height: 50px;
    max-width: 60px;
  }
  .Personnal_info{
    font-size: small;
  }
  .MemberIntro{
    margin-bottom: 10px;
    align-items: center; 
    display:flex;
    border-radius: 8px;
    background-color: #e7a4e7;
  }
  .home_container {
  /* height: 100%; */
  
  overflow-y: hidden;
}
.el-header {
    height: 10vh;
  background-color: #363d40;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 10px;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.el-main {
    height: 90vh;
  background-color: #e9edf1;
  padding: 0px;
}
  </style>
  