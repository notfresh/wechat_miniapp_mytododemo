Page({
  data: {
    todos:[],
    input: '',
    leftCount: 0
  },
  onLoad: function () {
    var todos = wx.getStorageSync('todo_list')
    if ( todos ){
      // 对数组进行过滤, 使用filter函数, 传入一个函数, 接受item, 代表一个子项, 这个函数只返回一个新的数组,而不改变原有数组
       var leftCount = todos.filter(function(item){
         return !item.completed
       }).length 
       this.setData({
         todos: todos,
         leftCount: leftCount
       })
    }
    var logs = wx.getStorageSync('todo_logs')
    if ( logs ){
       this.setData({logs: logs})
    } 
  },
  inputHandle: function(e){
    this.setData({
      input:e.detail.value
    })
  },
  save: function(){
    wx.setStorageSync('todo_list', this.data.todos)
  },
  in1_bindconfirm: function(e){
    if (!this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({
      name: this.data.input,
      completed: false
    })
    // TODO: 增加日志
    this.setData({
      todos:todos,
      leftCount: this.data.leftCount + 1,
      input: '' // 把输入框里的值置空
    })
    this.save()
  },
  toggleOne: function(e){
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    this.setData({
      todos: todos,
      leftCount : this.data.leftCount + (todos[index].completed?-1:1)
    })
  },
  toggleALl:function(){

  },
  clearCompleted: function(){
    var todos = this.data.todos
    todos = todos.filter(function(item){
      return !item.completed
    })
    this.setData({
      todos: todos
    })
    this.save();
  }
})
