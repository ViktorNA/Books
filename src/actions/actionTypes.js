import {v4} from 'node-uuid'

export const addBook = item => {
  return {
    type: 'ADD_BOOK_TO_CART',
    numb: v4(),
    item
  }
}

export const addComp = item => {
  return {
    type: 'ADD_BOOK_TO_COMPARE',
    numb: v4(),
    item
  }
}

export const changeLoad = isLoad => {
  return {
    type: 'CHANGE_LOAD',
    isLoad
  }
}
