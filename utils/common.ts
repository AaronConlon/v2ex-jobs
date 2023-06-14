export const waitAMoment = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const makeTaskSlow = async <T>(
  promise: Promise<T>,
  time: number = 1000
) => {
  return Promise.all([promise, waitAMoment(time)])[0] as T
}
