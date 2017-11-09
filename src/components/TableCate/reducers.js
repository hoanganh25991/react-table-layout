export const DRAG_TO_MAP = "DRAG_TO_MAP"
export const DROP_IMG = "DROP_IMG"

export const initState = {}
export const reducers = (state = initState, action) => {
  const { type } = action
  switch (type) {
    case DRAG_TO_MAP: {
      const { object, top, left } = action
      return { ...state, object, top, left }
    }
    case DROP_IMG: {
      const { top, left, target } = action
      return { ...state, top, left, target }
    }
    default: {
      return state
    }
  }
}
