import { createClient } from '@supabase/supabase-js'

const bucket = "zyrsq-bucket" //TODO: Create New Audio Bucket

export const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export const uploadAudioFileToBucket = async (audio: File) => {
    const timeStamp = Date.now()
    const name = `${audio.name}-${timeStamp}`
    const { data } = await supabaseClient.storage.from(bucket).upload(
        name, audio, { cacheControl: "3600" }
    )
    if (!data) throw new Error("Could not upload audio")
    return supabaseClient.storage.from(bucket).getPublicUrl(name).data.publicUrl;

}

export const uploadAudoFilesToBucket = async (audios: File[]) => {
    const audioUrls = []
    for (const audio of audios) {
        const timeStamp = Date.now()
        const name = `${timeStamp}-${audio.name}`
        const { data, error } = await supabaseClient.storage.from(bucket).upload(name, audio, { cacheControl: "3600" })
        if (error) {
            console.error("Supabase upload error:", error)
            throw new Error(`Could not upload audio: ${error.message}`)
        }
        if (!data) throw new Error("Could not upload image: No data returned")
        audioUrls.push(supabaseClient.storage.from(bucket).getPublicUrl(name).data.publicUrl)
    }
    return audioUrls
}

export const deleteAudioFileFromBucket = (url: string) => {
    const audioFileName = url.split("/").pop();
    if (!audioFileName) throw new Error("Invalid Audio File URL");
    return supabaseClient.storage.from(bucket).remove([audioFileName]);
};

export const deleteAudioFilesFromBucket = (urls: string[]) => {
    const audioFileNames = urls.map((url) => url.split("/").pop());
    if (audioFileNames.some((name) => !name)) throw new Error("Invalid Audio File URL");
    for (const audioFileName of audioFileNames) {
        if (audioFileName) {
            return supabaseClient.storage.from(bucket).remove([audioFileName]);
        }
    }
};