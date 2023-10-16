import {Configuration,OpenAIApi} from 'openai-edge'

const config = new Configuration({
    apiKey:process.env.OPENAI_APIKEY,
})

const openAi = new OpenAIApi(config);

export async function genPrompt(prompt:String){
try {
    const response = await openAi.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[
            {
                role:"system",
                content:"You are a creative and helpful AI that works on creating interesting thumbnail descriptions, your descriptions would be further fed into DALLE's image generation engine to get a thumbnail.The description should be minimlistic and flat styled"
            },
            {
                role:"user",
                content:`Please generate a thumbnail description for my note titled ${prompt}`
            }
        ]

    })
    const data = await response.json();
    const image_desc = data.choices[0].message.content;
    return image_desc as string;  
} catch (error) {
    console.error(error);
    throw error;
}

}

export async function generateImage(image_desc:string){
    try {
        const response = await openAi.createImage({
            prompt:image_desc,
            n:1,
            size:"256x256",
        });
        const data = await response.json();
        const img_url = data.data[0].url;
        return img_url as string;
    } catch (error) {
        console.error(error);
        throw error;
    }
}