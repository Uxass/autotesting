import { MospolytechPage } from "../../pages/mospolytech/mospolytech.js";
import { beforeEach, afterEach, it } from "mocha";
import { assert } from "chai";

const mospolytechInstance = new MospolytechPage('221-323');

before(async () => {
  await mospolytechInstance.open();
});

it('открытие расписания', async () => {
  await mospolytechInstance.openTable();
});

it('проверка на открытие новой вкладки', async () => {
  const checkNewTab = await mospolytechInstance.openTableSiteInNewWindow();
  assert.isTrue(checkNewTab, 'Новая вкладка не была открыта');
});

it('ввод группы', async () => {
  await mospolytechInstance.enterGroup();
});

it('проверка на количество групп в списке, проверка на то, есть ли нужная группа в списке', async () => {
  const groups = await mospolytechInstance.getGroups();
  const myGroup = await mospolytechInstance.findGroup();
  assert.isTrue(groups === 1, 'Было найдено больше, чем одна группа');
  assert.isTrue(myGroup, 'Найденная группа не соответсвует заданной');
});

it('проверка на соответствие текущего дня недели в расписании', async () => {
  await mospolytechInstance.clickGroup();
  assert.equal(await mospolytechInstance.checkColorOfCurrentDay(), true);
});

afterEach(async function(){
  if (this.currentTest.state === 'failed'){
    await mospolytechInstance.saveScreenshot(this.currentTest.title);
    console.log(`Скриншот сохранен в папке screenshots/lab2/${this.currentTest.title}`);
  }
});

after(async () => {
  await mospolytechInstance.closeBrowser();
});
