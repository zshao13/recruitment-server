
export const successData = (data, status = 0) => {
    return {
        data,
        status,
        success: true,
        errDesc: ''
    }
}

export const errorData = (desc, status = 1) => {
    return {
        data: null,
        status,
        success: false,
        errDesc: desc
    }
}
