<template>
  <div class="wrapper">
      <VWarn></VWarn>
      <div class="top" @click="goback">返回</div>
      <div class="main">
         <!-- 第一页,填写手机号码 -->
         <div class="first" v-show="showPage==1">
            <h1>输入手机号码</h1>
            <p>注册即代表阅读并同意<span>使用条款</span>和<span>隐私政策</span></p>
            <div class="native">
              <span>国家/地区</span>
              <input type="text" class="text" value="中国" readonly/>
            </div>
            <div class="phone">
              <span>+86</span>
              <input type="text" class="text" v-model="phone" ref="phone"/>
              <img src="./fhz.png" @click="clearPhone" v-show="isClearPhone">
            </div>
            <div class="next">
             <input type="button" class="btn" value="下一步" @click="showSecondPage"  
             :class="{enable:isEnable}" :disabled="!isEnable">
            </div>   
         </div>

         <!-- 第二页,填写短信验证码 -->
         <div class="second" v-show="showPage==2">
            <h1>输入短信验证码</h1>
            <p>我们已给手机号码<span class="phone">+86 {{phone}}</span>发送了一个6位数验证码。</p>
            <ul class="number">
                <li> 
                    <input class="text" ref="firstNum" v-model="code.firstNum"
                    :class="{'fill':code.firstNum!=''}" maxlength="1"
                    @keyup="autoFocus(0)" @touchend="autoFocus(0)">
                </li>
                <li>
                    <input class="text" ref="secondNum" v-model="code.secondNum" 
                    :class="{'fill':code.secondNum!=''}" maxlength="1"
                    @keyup="autoFocus(1)" @touchend="autoFocus(1)">
                </li>
                <li>
                    <input class="text" ref="thirdNum" v-model="code.thirdNum"
                    :class="{'fill':code.thirdNum!=''}" maxlength="1"
                    @keyup="autoFocus(2)" @touchend="autoFocus(2)">
                </li>
                <li>
                    <input class="text" ref="fourthNum" v-model="code.fourthNum"
                    :class="{'fill':code.fourthNum!=''}" maxlength="1"
                    @keyup="autoFocus(3)" @touchend="autoFocus(3)">
                </li>
                <li>
                    <input class="text" ref="fiveNum" v-model="code.fiveNum"
                    :class="{'fill':code.fiveNum!=''}" maxlength="1"
                    @keyup="autoFocus(4)" @touchend="autoFocus(4)">
                </li>
                <li>
                    <input class="text" ref="sixNum" v-model="code.sixNum"
                    :class="{'fill':code.sixNum!=''}" maxlength="1"
                    @keyup="autoFocus(5)" @touchend="autoFocus(5)">
                </li>
            </ul>
            <p class="left" :class="{resend:time==0}" @click="reSend">重新发送
              <span v-show="time!=0">({{time}}s)</span>
            </p>
            <div class="tip">
              <p class="left">将此手机号码和QQ号绑定,提高账号安全性。</p>
              <p class="left">开启<span>设备锁</span>,保证QQ账号安全</p>
            </div>
         </div>
         
         <!-- 第三页,设置昵称 -->
         <div class="third" v-show="showPage==3">
            <h1>设置昵称</h1>
            <p>建议填写你的真实名字,让你的朋友更容易认出你。此昵称以后可以随意修改。</p>
            <div class="nickname">
               <input type="text" class="text" v-model="nickname" ref="nickname"/>
               <img src="./fhz.png" @click="clearNickName" 
               v-show="isClearNickName">
               <input type="button" class="btn" value="注册" @click="register"  
             :class="{enable:nickname!=''}" :disabled="nickname==''">
            </div>
         </div>

         <!-- 第四页,获取QQ号 -->
         <div class="fourth" v-show="showPage==4">
           <h1>注册成功</h1>
           <div class="info">
             <p class="ptop">你的QQ号为:</p>
             <p class="qq">{{qq}}</p>
             <p class="info">该QQ号与手机号码 <span>+86 {{formatPhone}}</span> 绑定,你可以通过短信验证登录QQ手机版(默认密码6个1)。</p>
             <input type="button" class="btn enable" value="登录" @click="login">
             <p class="warn">三天内未登陆，该QQ号将被回收</p>
           </div>
         </div>

      </div>
  </div>
</template>

<script>
import {sendMessage,validate,register} from '@/api/register'
import VWarn from '@/base/Warn/Warn'

export default {
  name: 'register',
  data () {
    return {
      phone:'',  //用户填的手机号
      nickname:'', // 用户的昵称
      qq:'',   //用户分配到的qq号
      showPage:1,  //默认显示第一页
      time:60,  //验证码剩余时间
      code:{   //验证码
        firstNum:'', //验证码第一个数
        secondNum:'', //验证码第二个数
        thirdNum:'',//验证码第三个数
        fourthNum:'',//验证码第四个数
        fiveNum:'',//验证码第五个数
        sixNum:'',//验证码第六个数 
      }
    }
  },
  mounted(){
     this.$refs.phone.focus()
  },
  computed:{
    //是否显示手机里的X图标
    isClearPhone(){
       return this.phone!==''
    },
    //手机号是否合法,对应下一步是否可以点击
    isEnable(){
      return /^(13|14|15|16|17|18)[\d]{9}$/.test(this.phone)
    },
    //用户填写的验证码
    validateCode(){
      return `${this.code.firstNum}${this.code.secondNum}${this.code.thirdNum}${this.code.fourthNum}${this.code.fiveNum}${this.code.sixNum}`
    },
    //是否显示昵称里的X图标
    isClearNickName(){
      return this.nickname!==''
    },
    //格式化手机号
    formatPhone(){
      return `${this.phone.substring(0,3)}-${this.phone.substring(3,7)}-${this.phone.substring(7,11)}`
    },
    //获得验证码数组
    inputValue(){
      return [
        this.code.firstNum,
        this.code.secondNum,
        this.code.thirdNum,
        this.code.fourthNum,
        this.code.fiveNum,
        this.code.sixNum
      ]
    }
  },
  methods:{ 
    //[四页公有] 返回
    goback(){
      if(this.showPage==1){
         this.$router.back()
      }else if(this.showPage==2){
        this.showPage=1
      }else if(this.showPage==3){
        this.showPage=2
      }else if(this.showPage==4){
        this.showPage=3
      }
    },
    //[第一页] 清空手机号
    clearPhone(){
      this.phone=''
    },
    //[第二页] 展示第二页
    showSecondPage(){
      if(this.isEnable){
        this.showPage=2 //展示第二页
        this.sendMessage()  //发送验证码到用户的手机
        this.startInterval()
        //下面必须要有个延时,因为v-show切换是要时间的，在还没有显示出来时firstNum是
        //获取不到焦点的
        setTimeout(()=>{
          this.$refs.firstNum.focus()
        },0)
      }
    },
    //[第二页] 数字框自动获得焦点
    autoFocus(index){
      const value=this.inputValue[index]
      if(value!=''){
        index==0?this.$refs.secondNum.focus():
        index==1?this.$refs.thirdNum.focus():
        index==2?this.$refs.fourthNum.focus():
        index==3?this.$refs.fiveNum.focus():
        index==4?this.$refs.sixNum.focus():''
      }else{
        index==1?this.$refs.firstNum.focus():
        index==2?this.$refs.secondNum.focus():
        index==3?this.$refs.thirdNum.focus():
        index==4?this.$refs.fourthNum.focus():
        index==5?this.$refs.fiveNum.focus():''
      }
    },
    //[第二页] 开始计时
    startInterval(){
      this.time=60
      const interval=setInterval(()=>{
          this.time--
          if(this.time==0||this.showPage==1||this.showPage==3){
            clearInterval(interval)
            this.time=0
          }
      },1000) 
    },
    //[第二页] 超时再次发送验证码到用户的手机
    reSend(){
      if(this.time==0){
        this.clearCode()
        this.sendMessage()
        this.startInterval()
      }
    },
    //清空所填的验证码
    clearCode(){
      this.code.firstNum='',
      this.code.secondNum=''
      this.code.thirdNum=''
      this.code.fourthNum=''
      this.code.fiveNum=''
      this.code.sixNum=''
    },
    //[第二页] 发送验证码到用户的手机
    async sendMessage(){
      await sendMessage({phone:this.phone})
    },
    //[第二页] 验证用户填写的验证码
    async validate(validateCode){
       if(this.time==0||validateCode.length!=6){
          this.$store.dispatch('setShowWarn','验证码错误,请重新发送短信验证')
          return
       }
       //验证
       const {code} = await validate({code:validateCode})
       if(code==1){
          this.showThirdPage()
       }else{
          this.$store.dispatch('setShowWarn','验证码错误,请重新发送短信验证')
       }
    },
    // [第三页] 显示第三页
    showThirdPage(){
      this.showPage=3
      setTimeout(()=>{
         this.$refs.nickname.focus()
      },0)
    },
    // [第三页] 清空昵称
    clearNickName(){
      this.nickname=''
    },
    // [第三页] 注册
    async register(){
      if(this.nickname!=''){
        const data={
          'phone':this.phone,
          'nickname':this.nickname
        }
        const res=await register(data)
        if(res.code==1){
           this.qq=res.data.qq
           this.showFourthPage()
        }
      }
    },
    //[第四页]显示页面内容
    showFourthPage(){
      this.showPage=4
    },
    //[第四页]登录
    login(){
      this.$router.push('/login')
    },
    //[第二页]限定只能是数字
    isNumber(val){
      return /^[\d]$/.test(val.trim())
    }
  },
  watch: {
    'code.firstNum': function (val) {
      if(!this.isNumber(val)){ 
        this.code.firstNum=''
      }
    },
    'code.secondNum': function (val) {
      if(!this.isNumber(val)){
        this.code.secondNum=''
      }
    },
    'code.thirdNum': function (val) {
      if(!this.isNumber(val)){
        this.code.thirdNum=''
      }
    },
    'code.fourthNum': function (val) {  
      if(!this.isNumber(val)){
        this.code.fourthNum=''
      }
    },
    'code.fiveNum': function (val) {
      if(!this.isNumber(val)){
        this.code.fiveNum=''
      }
    },
    'code.sixNum': function (val) {
      if(!this.isNumber(val)){
        this.code.sixNum=''
      }
      val!=''&&this.validate(this.validateCode)
    }
  },
  components:{
    VWarn
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.wrapper{
  background:#fff !important;
}
.top{
  background: url(./fas.png) no-repeat left center;
  width: 100%;
  line-height: 30px;
  margin:34px 0 10px 10px;
  color: #666;
  text-indent: 1.5em;
  cursor: pointer;
}
.main{
  margin:30px 0 10px 40px;
  font-family: 'Microsoft Yahei'
}
.first h1,.second h1,.third h1,.fourth h1{
  font-weight: normal;
}
.first{
  p{
    margin-top:10px;
    span{
       margin-top:10px;
       color: #1E90FF;
       cursor: pointer;
    }
  }
  .phone,.native{
    position: relative;
    input{
      font-size: 16px;
      width: 70%;
      margin-top: 20px;
      box-sizing : content-box;
      padding-left: 90px;
      font-family: 'Microsoft Yahei' !important
    }
    span{
      position: absolute;
      top: 28px;
      left: 10px;
      color:#666;
    }
  }
  input.btn{
    margin-top:50px;
  }
  .phone{
    img{
       position: absolute;
       top: 28px;
       left: 80%;
       cursor: pointer;
       transform: scale(0.8);
    }
  }
}

.second{
  p{
    margin-top:10px;
    width: 96%;
    color: #666;
    letter-spacing: 1px;
    span.phone{
       color:orange;
    }
  }
  ul{
    margin:20px 0 20px 0;
    li{
      background: #eee;
      width: 30px;
      margin-right:16px;
      float: left;
      input{
        width: 100%;
        text-align: center;
        border-bottom: 2px solid #ccc;
        &.fill{
          border-bottom: 2px solid #666;
        }
      }
    }
  }
  p.left{
    color: #ccc
  }
  p.resend{
    color: #1E90FF;
    cursor: pointer;
  }
  .tip{
    margin-top:60px;
    p{
      background: url(./fzu.png) no-repeat;
      background-size: 20px 20px;
      padding-left: 22px;
      line-height: 20px;
      color: #666;
      span{
        color: #1E90FF;
        cursor: pointer;
      }
    }
  }
}

.third{
  p{
    margin-top:10px;
    color: #666;
    width: 96%;
    letter-spacing: 1px
  }
  .nickname{
    position: relative;
    input{
      font-size: 16px;
      width: 90%;
      margin-top: 10px;
      box-sizing : content-box;
      font-family: 'Microsoft Yahei' !important
    }
    img{
       position: absolute;
       top: 20px;
       left: 80%;
       cursor: pointer;
       transform: scale(0.8);
    }
    input.btn{
      margin-top:40px;
      line-height:40px;
      font-size:20px
    }
  }
}

.fourth{
  h1{
    background:url(./hoy.png) no-repeat left center;
    background-size:36px 36px;
    padding-left:50px;
  }
  .info{
    color:#666;
    margin-top:50px;
    font-size:20px
  }
  p.ptop{
    letter-spacing:1px;
    color:#666;
  }
  p.qq{
    margin-top:20px;
    font-size:40px;
    color:#000;
  }
  p.info{
    margin-top:20px;
    font-size:16px;
    width:90%;
    span{
      color:orange
    }
  }
  input.btn{
    line-height:40px;
    margin-top:50px;
    font-size:18px;
    width:90%;
  }
  p.warn{
    margin-top:20px;
    text-align:center;
    width:90%;
    font-size:16px;
  }
}

input.btn{
  width: 95%;
  line-height: 32px;
  background: #ccc;
  color: white;
  cursor: not-allowed;
  font-family: 'Microsoft Yahei' !important
}
input.btn.enable{
  background: #1E90FF;
  cursor: pointer;
}
</style>
