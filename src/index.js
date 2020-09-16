(async () => {
  const {MongoClient: MongoDB} = require ('mongodb');
  const client = new MongoDB ('mongodb://localhost:27017', {
    //userNewUrlParser这个属性会在url⾥识别验证⽤户所需的db
    userNewUrlParser: true,
  });

  let ret;
  // 创建连接
  ret = await client.connect ();
  const db = client.db ('test');

  const fruits = db.collection ('fruits');

  // 添加⽂档
  ret = await fruits.insertOne ({
    name: '芒果',
    price: 20.1,
  });
  console.log ('插⼊成功', JSON.stringify (ret));
  ret = await fruits.findOne ();
  console.log ('查询⽂档:', ret);

  // 更新⽂档
  // 更新的操作符 $set
  ret = await fruits.updateOne ({name: '芒果'}, {$set: {name: '苹果'}});
//   console.log ('更新⽂档', JSON.stringify (ret.result));

  // 删除⽂档
  ret = await fruits.deleteOne ({name: '苹果'});

  await fruits.deleteMany ();

  client.close ();
}) ();
