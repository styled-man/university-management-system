export interface UserData {
    personalInfo: PersonalInfo
    addresses: Address[]
}

export const INITIAL_STATE = {} as UserData

type Action =
    | {
          type: "MODIFY_PERSONAL_INFO"
          payload: Partial<PersonalInfo>
      }
    | {
          type: "NEW_ADDRESS"
          payload: Address
      }
    | {
          type: "DELETE_ADDRESS"
          payload: {
              index: number
          }
      }
    | {
          type: "MODIFY_ADDRESS"
          payload: {
              index: number
              data: Partial<Address>
          }
      }

export function userDataReducer(state: typeof INITIAL_STATE, action: Action): UserData {
    switch (action.type) {
        case "MODIFY_PERSONAL_INFO":
            return {
                ...state,
                personalInfo: {
                    ...state.personalInfo,
                    ...action.payload,
                },
            }
        case "NEW_ADDRESS":
            return {
                ...state,
                addresses: [...state.addresses, action.payload],
            }
        case "DELETE_ADDRESS":
            return {
                ...state,
                addresses: state.addresses.filter((_, index) => index !== action.payload.index),
            }
        case "MODIFY_ADDRESS":
            const addresses = (state.addresses || [{}]).map((addr, index) => {
                if (index === action.payload.index) {
                    return {
                        ...addr,
                        ...action.payload.data,
                    }
                }
                return addr
            })

            return { ...state, addresses }
    }
}
