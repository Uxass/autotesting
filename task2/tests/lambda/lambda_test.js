import { beforeEach, afterEach, describe, it } from "mocha";
import { assert } from "chai";
import { LambdaPage } from "../../pages/lambda_test/lambda.js";

const lambdaPage = new LambdaPage()

describe('Тестирование Lambda', () => {
  before(async () => {
    await lambdaPage.open()
    await lambdaPage.getElements()
  })

  it('должен проверить заголовок', async () => {
    assert.isTrue(
      await lambdaPage.checkTitle(),
      'Заголовок не соответствует'
    )
  })

  it('должен проверить, что первый чекбокс не активен', async () => {
    const item = await lambdaPage.getItem(1)
    assert.isTrue(
      await lambdaPage.isItemNotActive(item),
      'Первый чекбокс должен быть неактивен'
    )
  })

  it('должен нажать на первый элемент, проверить, активен ли он, затем проверить заголовок', async () => {
    const item = await lambdaPage.getItem(1)
    await lambdaPage.clickItem(1)

    assert.isTrue(
      await lambdaPage.isItemActive(item),
      'Первый элемент должен быть активен после нажатия'
    )
    assert.isTrue(
      await lambdaPage.checkTitle(),
      'Заголовок не соответствует'
    )
  })

  it ('должен проверить, активны ли остальные элементы, затем нажать на них и проверить, стали ли они активны', async () => {
    const {total, falseTotal} = await lambdaPage.getElements()
    for (let i=2; i<=total; i++) {
      const item = await lambdaPage.getItem(i)
      assert.isFalse(
        await lambdaPage.isItemActive(item),
        `Элемент ${i} должен быть неактивен`
      )
      await lambdaPage.clickItem(i)
      assert.isTrue(
        await lambdaPage.isItemActive(item),
        `Элемент ${i} должен быть активен после нажатия`
      )
      assert.isTrue(
        await lambdaPage.checkTitle(),
        'Заголовок неправильный'
      )
    }
  })

  it('должен добавить новый элемент и проверить его', async () => {
    await lambdaPage.createNewItem('новый элемент')
    const {total, falseTotal} = await lambdaPage.getElements()
    const newItem = await lambdaPage.getItem(total)
    assert.isFalse(
      await lambdaPage.isItemActive(newItem),
      'Добавленный элемент должен быть неактивен'
    )
    assert.isTrue(
      await lambdaPage.checkTitle(),
      'Заголовок неверный'
    )

  })
  it('должен кликнуть по новому элементу', async () => {
    const {total, falseTotal} = await lambdaPage.getElements()
    const newItem = await lambdaPage.getItem(total)
    await lambdaPage.clickItem(total)
    assert.isTrue(
      await lambdaPage.isItemActive(newItem),
      'Новый элемент должен быть активным после нажатия'
    )
    assert.isTrue(
      await lambdaPage.checkTitle(),
      'Заголовок отображается неверно после добавления нового элемента'
    )
  })

  afterEach(async function(){
    if (this.currentTest.state === 'failed'){
      await lambdaPage.saveScreenshot(this.currentTest.title)
      console.log(`Скриншот сохранен в папке screenshots/lab2/${this.currentTest.title}`)
    }
  })

  after(async () => {
    await lambdaPage.closeBrowser()
  });
});

