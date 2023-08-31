<template>
<div class="app-container">
    <!-- <h1 class="chat-title">M01组模型</h1> -->
    <div class='app'>
        <div v-if="!isMobile" class="sidebar">
                <!-- <h3 style="color: white;">会话记录</h3> -->
                <div class="Imgstyle" style="display: flex;justify-content: space-between;">
                  <img src="@/assets/ifly.png" alt="" style="width: 9vw;height: 5vh;" />
                  <img src="@/assets/spark.png" alt="" style="width: 9vw;height: 5vh;" />
                </div>
                <div class="conversation-list">
                    <div style="margin-bottom: 5%;margin-top:8%">
                        <el-button class="conversation-item"
                        @click="CreatNewconversation()">
                            <el-icon :size="17"><Plus /></el-icon>
                        </el-button>
                    </div>
                    <el-button
                    v-for="conversation in conversationList"
                    :key="conversation.id"
                    class="conversation-item"
                    @click="loadConversation(conversation.id)"
                    style="    margin-left: auto;margin-bottom: 2%;"
                    >
                        {{ conversation.title }}
                        <!-- <el-icon :size="20"><Delete /></el-icon> -->
                    </el-button>
                </div>
                <div class="robot-container">
                  <img src="@/assets/Robot3D.png" alt="3D Robot" class="robot" id="robot" />
                </div>
                
        </div>
        <div class="chat-container" :class="isMobile?'Mobilechat':'Pcchat'">
            <div class="chat-window">
                <div class="user-info">
                    <!-- 在这里放置聊天人的头像和其他信息 -->
                    <!-- <el-avatar :size="35" :src="circleUrl" /> -->
                    <h1 v-if="!isMobile" class="Bot_name" style=" font-size: 30px; color: #585889;font-weight: bolder;">M01 Desk</h1>
                    <h1 v-else class="Bot_name" style=" font-size: 15px; color: #585889;font-weight: bolder;">M01 Desk</h1>
                    <div class="VersionSelct" :class="isMobile ? 'MobileVersionSelct' : 'PcVersionSelct'">
                      <el-popover
                        placement="top-start"
                        title="V1.0模型"
                        :width="200"
                        trigger="hover"
                        content="我们的1.0模型，匹配机制存在缺陷，推荐效果不佳。"
                        auto-close: 0
                      >
                        <template #reference>
                          <button class="versionBut"
                          :class="{ active: activeButton === 'M01' }"
                          @click="toggleButton('M01')"
                          >M01 V1.0</button>
                        </template>
                      </el-popover>
                      <el-popover
                        placement="top-start"
                        title="V2.0模型"
                        :width="200"
                        trigger="hover"
                        content="我们的2.0模型对模型1的匹配机制进行了优化，提高了推荐效果，但存在效率上的问题，响应时间过长。"
                        auto-close: 0
                      >
                        <template #reference>
                          <button
                          :class="{ active: activeButton === 'M02' }"
                          @click="toggleButton('M02')"
                          class="versionBut">M01 V2.0</button>
                        </template>
                      </el-popover>
                      <el-popover
                        placement="top-start"
                        title="V3.0模型"
                        :width="200"
                        trigger="hover"
                        content="我们的3.0模型在不牺牲模型2的推荐效果的前提下，减少了模型的响应时间，至此，速度与效果兼备！"
                        auto-close: 0
                      >
                        <template #reference>
                          <button
                          :class="{ active: activeButton === 'M03' }"
                          @click="toggleButton('M03')"
                          class="versionBut">M01 V3.0</button>
                        </template>
                      </el-popover>
                    </div>
                    <!-- <el-button type="info" style="border:none;background-color: rgb(207, 163, 204) ; margin-left: auto;" @click="drawer = true">
                    模型简介
                    </el-button> -->
                    <!-- <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                        <span>Hi there!</span>
                    </el-drawer> -->
                </div>
                <div class="message-container" ref="messageContainer">
                  <div v-for="message in messages" :key="message.id" class="message" :class="message.isMe ? 'mine' : 'yours'" style="display: flex;">
                    <el-avatar v-if="!message.isMe" :src="yourAvatarUrl" style="margin-top: 3vh"/>
                    <div :class="message.isMe ? 'myAva_Text' : 'yourAva_Text'">
                      <div :class="message.isMe?'myname':'yourname'" style="font-weight: bold; ">{{ message.sender }}               {{ message.time }}</div>
                      <!-- <img v-if="message.isMe" :src="myAvatarUrl" class="avatar" /> -->
                      <div class="message-bubble" :class="message.isMe ? 'mymessage' : 'yourmessage'">
                        <div v-if="message.text === ''">
                          <!-- 这里添加你的加载动画 -->
                          <el-image 
                          style="width: 20px;height: 20px;"
                          :src="loadingFig"/>
                        </div>
                        <div v-else >
                          {{ message.text }}
                        </div>
                      </div>
                    </div>
                    <el-avatar v-if="message.isMe" :src="myAvatarUrl" style="margin-top: 20px"/>
                  </div>
                </div>
                <form @submit.prevent="sendMessage" class="input-form">
                    <el-popover
                        placement="top-start"
                        title="提示"
                        :width="200"
                        trigger="hover"
                        content="点击将会删除当前会话记录并将其从历史记录中抹除哦！"
                    >
                        <template #reference>
                            <el-button class="m-2" style="border: none; background-color: transparent; width: 2vh;height: 4vh;" @click="deleteConversation()">
                                <el-icon :size="30"><Delete /></el-icon>
                            </el-button>    
                        </template>
                    </el-popover>
                    <el-input 
                    ref="textarea"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                    v-model="inputText"
                    type="textarea"
                    :placeholder="placeholderText"
                    class="input-field"
                    :disabled="isSending"
                    @keyup.enter="sendMessage"
                    >
                        <i
                            v-if="isLoading"
                            class="el-input__icon el-icon-loading"
                            slot="prefix"
                        ></i>
                    </el-input>
                    <button type="submit" class="send-button">
                        <img src="@/assets/send.png" alt="Send Icon" class="send-icon" />
                    </button>
                    <!-- <button @click="resetConversation" class="reset-button">重置</button> -->
                </form>
            </div>
        </div>
    </div>
</div>
    
</template>

  
  
<script lang="js">
import axios from 'axios'
// const yqlProxyUrl = 'https://query.yahooapis.com/v1/public/yql?q=';
// const query = encodeURIComponent(`select * from json where url="http://api.cyansu.top/api/chat/?token=1&text=我不是药神"`);
// const fullUrl = `${yqlProxyUrl}${query}&format=json`;

import { ElMessage, ElMessageBox } from 'element-plus'
import circleUrl from '../assets/M01logo.png'
import circleUrl1 from '../assets/Robot.png'
import loadingFig from '../assets/loading.gif'
  export default {
    data() {
      return {
        isMobile: false,
        currentTime:'',
        timeout: 40000,
        token: Date.now(),
        activeButton: 'M03',//当前模型版本
        myAvatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        yourAvatarUrl: circleUrl1,
        isLoading:false,
        isLoadingResponse: false,
        globalConverId: 1,
        activeConverId: 0,
        viewHistory: false,
        drawer: false,
        circleUrl:circleUrl,
        loadingFig:loadingFig,
        placeholderText: '请输入您想聊的话题~~~',
        isSending: false,
        inputText: '',
        activeConversation: null,
        conversationList: [
            // ...其他聊天记录...
        ],
        messages: [
          {time:this.updateCurrentTime(), id: 1, sender: '聊天机器人',text: '您好,我是M01组的聊天机器人小欣欣，有什么可以帮您的吗?', isMe: false }
        ],
      };
    },
    mounted() {
      this.isMobile = this.is_Mobile()
    },
    methods: {
      is_Mobile(){
        if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
          return true; // 移动端
        }else{
          return false; // PC端
        }
      },
      updateCurrentTime(){
        const now = new Date();
        return now.toLocaleTimeString();
      },
      toggleButton(buttonId) {
        if(this.isSending){
          ElMessage({
              message: '请等待机器人回复！',
              type: 'error',
          })
          return 0
        }
        this.token = Date.now()
        if (this.activeButton === buttonId) {
          this.activeButton = buttonId;
        } else {
          if(this.messages.length !== 1){
            ElMessageBox.confirm(
              '当前操作将切换模型，并清除模型上下文连接！',
              'Warning',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
              }
            ).then(() => {
                ElMessage({
                  type: 'success',
                  message: '切换成功',
                })
                this.activeButton = buttonId;
                this.CreatNewconversation()
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: '切换取消',
                })
              })
            
          }else{
            this.activeButton = buttonId;
          }
        }
      },
      async getResponseV2(content) {
        let timeout = this.timeout
        // let id = Date.now()
        try {
          let data =  await axios.get(`http://api.cyansu.top/v2/chat/?token=${this.token}&text=${content}`,{ timeout }).then(res=>{
          console.log(res.data)
          if(res.data.message!==''){
              this.messages[this.messages.length-1]['text'] = res.data.message
            }else{
              this.messages[this.messages.length-1]['text'] = '您输入的内容似乎遇到了些小问题，大模型暂时无法回答哦~'
            }
          this.placeholderText =  '请输入您要继续的话题~~'
        
          this.scrollToBottom()
        })
        } catch (error) {
          console.error('Error fetching data:', error);

          // 处理请求错误，例如显示错误消息或停止加载状态
          this.messages[this.messages.length-1]['text'] = '不好意思，网络开小差儿了，请稍后再试吧~'
          ElMessage({
                    message: '网络连接错误，请稍后再试！',
                    type: 'warning',
                })
        }
        // let content = "我不是药神"
          this.isSending = false
      },
      async getResponseV3(content) {
        let timeout = this.timeout
        // let id = Date.now()
        try {
          let data =  await axios.get(`http://api.cyansu.top/v3/chat/?token=${this.token}&text=${content}`,{ timeout }).then(res=>{
            console.log(res.data)
            if(res.data.message!==''){
              this.messages[this.messages.length-1]['text'] = res.data.message
            }else{
              this.messages[this.messages.length-1]['text'] = '您输入的内容似乎遇到了些小问题，大模型暂时无法回答哦~'
            }
            
            this.placeholderText =  '请输入您要继续的话题~~'
          
            this.scrollToBottom()
          })
        } catch (error) {
          console.error('Error fetching data:', error);

          // 处理请求错误，例如显示错误消息或停止加载状态
          this.messages[this.messages.length-1]['text'] = '不好意思，网络开小差儿了，请稍后再试吧~'
          ElMessage({
                    message: '网络连接错误，请稍后再试！',
                    type: 'warning',
                })
        }
        // let content = "我不是药神"
          this.isSending = false
      },
      async getResponseV1(content) {
        let timeout = this.timeout
        // let id = Date.now()
        try {
          let data =  await axios.get(`http://api.cyansu.top/v1/chat/?token=${this.token}&text=${content}`,{ timeout }).then(res=>{
          console.log(res.data)
          if(res.data.message!==''){
              this.messages[this.messages.length-1]['text'] = res.data.message
            }else{
              this.messages[this.messages.length-1]['text'] = '您输入的内容似乎遇到了些小问题，大模型暂时无法回答哦~'
            }
          this.placeholderText =  '请输入您要继续的话题~~'
          
          this.scrollToBottom()
        })
        } catch (error) {
          console.error('Error fetching data:', error);

          // 处理请求错误，例如显示错误消息或停止加载状态
          this.messages[this.messages.length-1]['text'] = '不好意思，网络开小差儿了，请稍后再试吧~'
          ElMessage({
                    message: '网络连接错误，请稍后再试！',
                    type: 'warning',
                })
        }
        // let content = "我不是药神"
          this.isSending = false
        },
      deleteConversation(){
        if(this.isSending){
          ElMessage({
              message: '请等待机器人回复！',
              type: 'error',
          })
          return 0
        }
          if(this.messages.length == 1){
              ElMessage({
                  message: '警告，当前您还未与机器人聊天！',
                  type: 'warning',
              })
              return 0
          }
          for (let i = 0;i < this.conversationList.length; i ++){
              if(this.conversationList[i]['id'] == this.activeConverId) {
                  console.log(this.conversationList[i])
                  this.conversationList.splice(i,1)
                  console.log(this.conversationList[i])
              }
          }
          ElMessage({
              message: '恭喜，您已成功清除当前信息，并将其从会话记录中抹除。',
              type: 'success',
          })
          this.messages = [
              {
                  time:this.updateCurrentTime(),
                  id: 1,
                  sender: '聊天机器人',
                  text: "你好,我是M01组的聊天机器人小欣欣，有什么可以帮您的吗?",
                  isMe: false,
              }
          ]
      },
      loadConversation(id) {
        if(this.isSending){
          ElMessage({
              message: '请等待机器人回复！',
              type: 'error',
          })
          return 0
        }
          this.activeConverId = id
          console.log(id)
          this.viewHistory = true
          // console.log(this.conversationList[id-1]['messages'])
          for(let i = 0;i<this.conversationList.length;i++){
            if(this.conversationList[i]['id'] === id){
              this.messages = this.conversationList[i]['messages']
            }
          }

          this.scrollToBottom()
          // console.log(this.conversationList[id-1]['messages'][3])
          // for(let i = 1; i < this.globalConverId; i ++){
          //     for(let k = 0;k<this.conversationList[i-1]['messages'].length;k++)
          //     console.log(this.conversationList[i-1]['messages'][k])
          // }
      },
      resetConversation() {
          this.messages = [
              {
                  id: Date.now(),
                  sender: '聊天机器人',
                  text: "你好,我是M01组的聊天机器人小欣欣，有什么可以帮您的吗?",
                  isMe: false,
              }
          ]
      },
      CreatNewconversation(){
        this.token = Date.now()
        if(this.isSending){
          ElMessage({
              message: '请等待机器人回复！',
              type: 'error',
          })
          return 0
        }
        if(this.messages.length == 1){
          ElMessage({
              message: '警告，您当前的窗口即为最新窗口！',
              type: 'error',
          })
          return 0
        }
        this.placeholderText = '请输入您想聊的话题~~~'
        if(this.viewHistory){
            if(this.messages.length > this.conversationList[this.activeConverId-1]['messages'].length) {
                this.conversationList[this.activeConverId-1]['title'] = this.messages[this.messages.length-1]['text'].substring(0,10)
                this.conversationList[this.activeConverId-1]['messages']=this.messages
                console.log(this.messages[this.messages.length-1]['text'].substring(0,10))
            }
            
            
            // this.conversationList.push({
            //     id: this.globalConverId,
            //     title: this.messages[this.messages.length-1]['text'].substring(0,6),
            //     messages: this.messages
            // });
            // this.globalConverId = this.globalConverId + 1
            // this.activeConverId = this.conversationList.length + 1
        } else {
            this.conversationList.push({
                id: this.globalConverId,
                title: this.messages[this.messages.length-1]['text'].substring(0,10),
                messages: this.messages
            });
            this.globalConverId = this.globalConverId + 1
            // this.activeConverId = this.conversationList.length + 1

            
        }
        this.messages = [
                {
                  time:this.updateCurrentTime(),
                    id: 1,
                    sender: '聊天机器人',
                    text: "你好,我是M01组的聊天机器人小欣欣，有什么可以帮您的吗?",
                    isMe: false,
                }
            ]
        this.viewHistory = false
            // this.conversationList.push({
            //     id: this.globalConverId,
            //     title: this.messages[this.messages.length-1]['text'].substring(0,6),
            //     messages: this.messages
            // });
        
        
        // this.$forceUpdate()
            
      },
      sendMessage() {
        if(this.inputText ===''){
          ElMessage({
              message: '请先输入消息！',
              type: 'error',
          })
          return 0
        }
          this.placeholderText =  '请等待机器人回复哦~~~'

          // this.isLoadingResponse = true;
          this.isSending = true
          if (this.inputText.trim()) {
              this.messages.push({
                time:this.updateCurrentTime(),
                  id: this.messages.length+1,
                  sender: '我',
                  text: this.inputText,
                  isMe: true,
              });
              // console.log(this.messages.length-1)
              // this.viewHistory = false
              this.messages.push({
                time:this.updateCurrentTime(),
                  id: this.messages.length+1,
                  sender: '聊天机器人',
                  text: '',
                  isMe: false,
              });
              if(this.activeButton === 'M01'){
                this.getResponseV1(this.inputText)
              }else if(this.activeButton === 'M02'){
                this.getResponseV2(this.inputText)
              }else{
                this.getResponseV3(this.inputText)
              }
              this.inputText = ''
              this.scrollToBottom()
          }
      },
      scrollToBottom() {
          // 获取消息容器的 DOM 元素
          const messageContainer = this.$refs.messageContainer;

          // 使用 JavaScript 将滚动位置设置为底部
          this.$nextTick(() => {
              messageContainer.scrollTop = messageContainer.scrollHeight;
          });
      }

    },
  };
  </script>
  
<style>
.MobileVersionSelct{
  width: 50%; /* 设置你想要的版本选择框的宽度 */
  height: 40px; /* 设置你想要的版本选择框的高度 */
}
.PcVersionSelct{
  width: 30%; /* 设置你想要的版本选择框的宽度 */
  height: 40px; /* 设置你想要的版本选择框的高度 */
}
.robot-container {
  margin-bottom: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  perspective: 800px; /* 设置透视距离，影响3D效果的视角 */
}

.robot {
  width: 100px;
  height: 100px;
  transform: rotateY(0deg) rotateX(0deg); /* 初始旋转角度 */

  transition: transform 1s; /* 添加过渡效果，使旋转平滑 */
}

.robot:hover {
  transform: rotateY(180deg) rotateX(20deg); /* 鼠标悬停时的旋转角度 */
}

.versionBut{
  color: #f1eded;
  font-weight: bold;
  font-size: smaller;
  border-radius: 8px;
  width: 48%;
  height: 80%;
  border: none;
  background-color: hsl(0, 3%, 76%);
}
.active {
  background-color: rgb(235, 229, 229); /* 背景色变亮 */
  color: black; /* 字体颜色变黑 */
}
.VersionSelct{
  background-color: hsl(0, 3%, 76%);
  /* width: auto; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  border-radius: 10px;
  /* 添加其他样式 */
}

.myAva_Text {
  margin-right: 10px;
}
.yourAva_Text{
  margin-left: 10px;
}
.user-info {
  height: 8vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 10px 0 10px 10px 10px;
    border-bottom: 1px solid #ccc; /* 设置底部边框 */
    /* 在这里添加其他样式 */
}
.conversation-item {
    border: none; /* Hide the border */
    background-color: transparent; /* Make the background transparent */
    color: inherit; /* Inherit the color from parent */
    font-weight: inherit;
    font-size: 0.01%;
    width:200px;
    background-color: hsl(167, 29%, 55%);
    color: #f4f4f4;
}
.conversation-list {
    /* width: 100px; */
    flex:1; 
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.app-container {
    flex: 1;
    width: 100vw;
    height: 90vh;
    /* height: 100%; */
    
    display: flex;
    flex-direction: column;
    align-items: center; /* 垂直居中 */
    /* justify-content: center;  */
    /* max-height: 600px; */
    /* height: 100%; */
    
}
  .app {
    flex: 1;
    width: 100%;
    display: flex; /* 使用 Flexbox 布局 */
    align-items: stretch; /* 让两个子容器的高度相等 */

    border-radius: 6px;
    background-color: hsl(0, 24%, 92%);
    }
  .sidebar {
    margin-right: 10;
    width: 20%; 
    /* background-color: #363d40; */
    background: linear-gradient(#b2e5da,rgb(149, 142, 240));
    padding: 5px;
    border-radius: 0 0 10% 0;
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
    /* gap: 10px;  */

    }

  .reset-button {
    padding: 8px 12px;
    background-color: #d9534f;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    transition: background-color 0.3s;
    }

    .reset-button:hover {
    background-color: #c9302c;
    }
  .message-bubble {
    background-color: rgb(255, 251, 251);
    display: inline-block;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    word-wrap: break-word;
    max-width: 500px;
    /* min-width: 300px; */
    position: relative; 
    /* overflow-x: hidden; */
    }   

.mymessage::after,
.yourmessage::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent; /* 控制尖角的大小 */
}

.mymessage::after {
  border-left-color: hwb(0 98% 2%);; /* 尖角颜色与气泡框背景色相同 */
  right: -16px; /* 调整尖角位置 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中 */
}

.yourmessage::after {
  border-right-color: hwb(0 98% 2%);;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
}
  .myname {
    font-size: 12px;
    margin-bottom: 4px;
    color: #888;
    text-align: right;
  }
  .yourname {
    font-size: 12px;
    margin-bottom: 4px;
    color: #888;
  }
  .message-text {
    background-color: hwb(33 23% 15%);
    display: inline-block;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    word-wrap: break-word; /* 自动换行 */
    max-width: 200px;
    /* text-align: right; */
  }
  .chat-title {
    font-size: 24px;
    font-weight: bold;
    /* margin-bottom: 10px;
    text-align: center;  */
    color: #333; /* Change the title color */
  }
   .mine {
    display: block;
    /* display: inline-block; */
    /* width: 100px; */
    align-self: flex-end;
    /* background-color: hsl(92, 70%, 55%);     */
    /* color: #0056b3; */
  }
  .yours {
    display: block;
    /* max-width: 350px; */
    align-self: flex-start;
    /* background-color: hsl(228, 43%, 52%); */
    /* color: hsl(111, 100%, 35%); */
    }
  .Mobilechat{
    background: url('../assets/M01logo1.png');
    /* background-size: cover; */
    background-position:center;
    /* opacity: 1; */
    background-size: 60% 50%;
    background-repeat: no-repeat;
  }
  .Pcchat{
    background: url('../assets/M01logo1.png');
    /* background-size: cover; */
    background-position:center;
    /* opacity: 1; */
    background-size: 45% 70%;
    background-repeat: no-repeat;
  }
  .chat-container {
    
    /* position: absolute; */
    flex: 1; /* 占据剩余空间 */ 
    display: flex;
    align-items: stretch;
    /* flex-direction: column;
    justify-content: center; 
    align-items: center; 
    width: 100%;
    max-width: 800px;
    margin: auto;
    padding-top: 20px;

    flex: 1; 
    background-color: hsl(0, 32%, 12%);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px; */
  }
  .chat-window {
    /* background-image: url('../assets/M01logo1.png'); */
    opacity: 0.95;
    flex: 1; /* 填满剩余空间 */
    /* background-color: rgb(234, 187, 187); */
    /* background: linear-gradient(rgb(243, 206, 206),rgb(150, 203, 221)); */
    background: linear-gradient(to right,#b2e5da,rgb(234, 187, 187));
    border-radius: 0 0 7% 7%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    padding-top: 0;
    padding-right: 10px;
    /* max-height: calc(100vh - 200px); */
    overflow-y: hidden;
    /* display: flex;
  flex-direction: column; */
    /* overflow-y: auto;  */

    /* width: 100%;
    height: 500px;
    max-width: 800px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  }
  
  .message-container {
    height: 66vh;
    margin-bottom: 10px;
    padding: 10px;
    /* height: 100%;
    max-height: 100%; */
    /* height: 71vh; 
    max-height: 71vh; */
    /* width: 100%; */
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column; /* 确保消息框在列中排列 */
    flex: 1;
    /* justify-content: flex-end; */
  }
  
  .message {
    margin: 5px 0;
    display: flex; /* 添加 flex 容器 */
    align-items: center; /* 垂直居中头像和消息气泡 */
    /* display: block; */
  }
  
  
  .input-form {
    height: 13vh;
    border-top: 2px solid hsl(298, 54%, 77%);
    max-height: 15%;
    display: flex;
    align-items: center;
    padding: 10px;
    padding-top: 0;
    /* border-top: 1px solid #ccc; */
  }
  /* .input-wrapper {
    display: flex;
    align-items: center;
    
 } */
  .input-field {
    /* height: 38px; */
    height: 40px;
    margin-left: 20px;
    flex: 1;
    border: none;
    /* padding: 10px; */
    /* border: 1px solid #ccc; */
    /* border-radius: 15px; */
    font-size: 14px;
    /* padding-left: 10px; */
    /* overflow-y: hidden; */
    resize: none;
    outline: none; 
    /* transition: border-color 0.3s; */
  }
  .input-field:focus {
    border-color: #ccc; /* 设置聚焦时的边框颜色 */
  }
  
  .send-button {
    margin-top: 2vh;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .send-icon {
    width: 35px;
    height: 35px;
    /* margin-right: 8px; */

    background-color: transparent;
    /* border: none; */
    /* cursor: pointer; */
    /* position: absolute; */
    right: 0;
    /* top: 50%; */
    /* transform: translateX(-180%); */
}
  
  /* .send-button:hover {
    background-color: #004080;
  }
   */
  .input-form::before {
    content: '';
    display: block;
    /* flex: 1; */
  }
  </style>
  