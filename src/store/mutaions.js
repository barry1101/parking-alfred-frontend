import {
  CHANGE_MOBILE_TAB_ITEM,
  SELECT_ROLE,
  GET_GRABBING_ORDERS,
  GET_TARGET_ORDER,
  GET_GRABBING_PARKING_LOTS,
  UPDATE_GRABBING_ORDER,
  UPDATE_TARGET_ORDER,
  GET_PARKING_BOY_ORDERS,
  UPDATE_PARKING_BOY_ORDER,
  CHANGE_WEB_ACTIVE_MENU_ITEM
} from './const-types'

const mutations = {
  [CHANGE_MOBILE_TAB_ITEM]: function (state, payload) {
    state.tabItemsSelected = payload.tabItemsSelected
  },
  [SELECT_ROLE]: function (state, payload) {
    state.roleSelected = payload.roleSelected
  },
  [GET_GRABBING_ORDERS] (state, orders) {
    const toDisplayTime = time => {
      const date = new Date()
      date.setTime(time)
      return date.toLocaleString()
    }
    let result = orders.data.map(order => ({
      id: order.id,
      carNumber: order.carNumber,
      customerAddress: order.customerAddress,
      reservationTime: toDisplayTime(order.reservationTime),
      status: order.status,
      type: order.type
    }))
    state.grabbingOrders.splice(0)
    state.grabbingOrders = [...result]
  },
  [GET_TARGET_ORDER] (state, payload) {
    state.targetOrder = payload.targetOrder
  },
  [GET_GRABBING_PARKING_LOTS] (state, payload) {
    state.grabbingParkingLots = payload.data
  },
  [UPDATE_GRABBING_ORDER] (state, payload) {
    const index = state.grabbingOrders.findIndex(value => value.id === payload.order.id)
    state.grabbingOrders.splice(index, 1)
  },
  [UPDATE_TARGET_ORDER] (state, payload) {
    state.targetOrder.parkingLot = payload.parkingLot
    state.targetOrder.status = 2
  },
  [GET_PARKING_BOY_ORDERS] (state, payload) {
    state.parkingBoyOrders = payload.parkingBoyOrders
  },
  [UPDATE_PARKING_BOY_ORDER] (state, payload) {
    const index = state.grabbingOrders.findIndex(value => value.id === payload.order.id)
    state.parkingBoyOrders[index] = payload.order
  },
  [CHANGE_WEB_ACTIVE_MENU_ITEM] (state, payload) {
    state.webActiveMenuItem = payload.webActiveMenuItem
  }
}

export default mutations
