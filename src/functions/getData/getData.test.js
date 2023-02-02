import axios from "axios";
import { getData } from "./getData";

jest.mock('axios')

describe('getData', () => {
    let response;
    beforeEach(() => {
        response = {
            data:[
                {
                    "id": 1,
                    "name": "Leanne Graham",
                    "username": "Bret",
                    "email": "Sincere@april.biz",
                    "address": {
                        "street": "Kulas Light",
                        "suite": "Apt. 556",
                        "city": "Gwenborough",
                        "zipcode": "92998-3874",
                        "geo": {
                            "lat": "-37.3159",
                            "lng": "81.1496"
                        }
                    },
                    "phone": "1-770-736-8031 x56442",
                    "website": "hildegard.org",
                    "company": {
                        "name": "Romaguera-Crona",
                        "catchPhrase": "Multi-layered client-server neural-net",
                        "bs": "harness real-time e-markets"
                    }
                }
            ]
        }
    })
    test('Корректное значение', async () => {
        axios.get.mockReturnValue(response)
        const data = await getData()
        expect(axios.get).toBeCalledTimes(1)
        expect(data).toEqual(['1'])
    })
})