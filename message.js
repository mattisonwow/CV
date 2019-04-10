!function () {
    var model = {

    }
    var view = document.querySelector('section#message')
    var controller = {
        view : null ,
        messageList :null ,
        init : function (view) {
            this.view = view
            this.messageList = $('#messageList')
            this.form = $('#messageForm')
            this.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        initAV: function () {
            var APP_ID = '69v27DqqxSPToza0FCpkjPDV-gzGzoHsz'
            var APP_KEY = 'hT6kQkS9k9FtvYFHIcULGUV2'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        loadMessages: function () {
            var query = new AV.Query('message')
            query.find().then((messages)=>{
                let array = messages.map((item)=>item.attributes)
                array.forEach((item)=>{
                    let li = document.createElement('li')
                    li.innerText = `${item.name} : ${item.words}`
                    this.messageList.append(li)
                })
            })
        },
        bindEvents: function () {
            this.form.on('submit',(e)=>{
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
                let $content = $('#content').val()
                let $name = $('#name').val()
                var Message= AV.Object.extend('message')
                var message = new Message()
                message.save({
                    name:$name,
                    words: $content
                }).then((items)=>{
                    let li = document.createElement('li')
                    li.innerText = `${items.attributes.name} : ${items.attributes.words}`
                    $('#messageList').append(li)
                    $('#content').val('')
                })
        }
    }

    controller.init()



}.call()