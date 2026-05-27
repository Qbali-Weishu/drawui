//此文件用于记录操作存储，以实现回退与重做
// 在Web Worker中打开IndexedDB数据库
const dbName = "operationStack";
const storeName = "data";
const request = indexedDB.open(dbName, 1);
const stack = [];

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore(storeName, { keyPath: "id", autoIncrement:true });
  objectStore.createIndex("model", "model", { unique: false });
};

function addData(model, data) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const item = {
        model: model,
        data: data,
        timestamp: Date.now()
      };
      const addRequest = objectStore.add(item);
      addRequest.onsuccess = function() {
        resolve(addRequest.result);
      };
      addRequest.onerror = function() {
        reject(addRequest.error);
      };
    };
    request.onerror = function() {
      reject(request.error);
    };
  });
}

function getLastDataByModel(model) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
	
    request.onsuccess = function(event) {
		console.log("open las",model)
      const db = event.target.result;
      const transaction = db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const index = objectStore.index("model");
      const range = IDBKeyRange.only(model);
		
      const cursorRequest = index.openCursor(range, "prev");
      cursorRequest.onsuccess = function(event) {
		const cursor = event.target.result;
        if (cursor) {
          const data = cursor.value.data;
          const id = cursor.value.id;
          const deleteRequest = objectStore.delete(id);
          deleteRequest.onsuccess = function() {
            resolve(data);
          };
          deleteRequest.onerror = function() {
            reject(deleteRequest.error);
          };
        } else {
          reject("No data found.");
        }
      };
      cursorRequest.onerror = function() {
        reject(cursorRequest.error);
      };
    };
    request.onerror = function() {
      reject(request.error);
    };
  });
}


/*addData("model1", { value: 10 })
  .then(() => {
    return addData("model2", { value: 20 });
  })
  .then(() => {
    return getLastDataByModel("model1");
  })
  .then(data => {
    stack.push(data);
    console.log("Data read: ", data);
    console.log("Stack: ", stack);
  })
  .catch(error => {
    console.error(error);
  });
*/

addEventListener('message',async cmd => {
	/*
	@param {cmd}
	Struct:{
			action:"redo/undo/push",//操作指令 撤回、重做、插入操作
			data:{}
	}
	*/
   console.log("cmd push",cmd)
	if(cmd.data.action=='push'){
		console.log("push stack")
		//插入操作
		addData(cmd.data.model,cmd.data.data).then(() => {
			console.log("操作入栈成功")
		}).catch((err)=>{console.log('pusherr',err)})
	}else if(cmd.data.action=='redo'){
		//撤销操作,读取最后一项，然后删除，添加到stack中
		console.log("redo")
		await getLastDataByModel(cmd.data.model).then(data=>{
			stack.push(data);
			return postMessage(data)
		}).catch((err)=>{console.log("redo err",err)});
	}else if(cmd.data.action=='undo'){
		//从stack中提取最后一项
		let data=JSON.parse(JSON.stringify(stack[stack.length-1]))
		stack.pop()
		addData(cmd.data.model,data).then(() => {
			console.log("重做入栈成功")
			return postMessage(data)
		})
	}
	return postMessage(false)
})
export default {}