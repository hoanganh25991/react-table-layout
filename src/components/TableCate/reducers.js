export const DRAG_TO_MAP = "DRAG_TO_MAP"

export const initState = {}
export const reducers = (state = initState, action) => {
  const { type } = action
  switch (type) {
    case DRAG_TO_MAP: {
      const { object, top, left } = action
      return { ...state, object, top, left }
    }
    default: {
      return state
    }
  }
}
