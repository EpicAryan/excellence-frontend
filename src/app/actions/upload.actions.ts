// notes.actions.ts - Remove "use server" directive from this function
export async function uploadNotes(data: {
  topicName: string;
  chapterId: number;
  chapterName: string;
  file: File;
  isActive: boolean;
}): Promise<void> {
  try {
    // Get access token from cookies (client-side)
    // const accessToken = document.cookie
    //   .split('; ')
    //   .find(row => row.startsWith('accessToken='))
    //   ?.split('=')[1];
    // console.log('Access Token:', accessToken);
    // if (!accessToken) throw new Error('User not authenticated');

    // Step 1: Get Cloudinary upload signature from your backend
    const signatureResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cloudinary/upload-signature`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        chapterId: data.chapterId,
        chapterName: data.chapterName,
        topicName: data.topicName,
         fileName: data.file.name
      }),
    });

    if (!signatureResponse.ok) {
      throw new Error('Failed to get upload signature');
    }

    const { signature, timestamp, publicId, cloudName, apiKey, folder } = await signatureResponse.json();

    // Step 2: Upload directly to Cloudinary (bypasses Next.js completely)
    const formData = new FormData();
    // const publicId = `${timestamp}-${data.file.name.replace(/\.[^/.]+$/, "")}.pdf`;
    
    formData.append('file', data.file);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', apiKey);
    formData.append('folder', folder);
    formData.append('public_id', publicId);
    formData.append('resource_type', 'raw');
    formData.append('overwrite', 'true');

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!cloudinaryResponse.ok) {
      const errorData = await cloudinaryResponse.json();
      throw new Error(`Failed to upload file to Cloudinary: ${errorData.error?.message || 'Unknown error'}`);
    }

    const cloudinaryResult = await cloudinaryResponse.json();

    // Step 3: Save topic data to your backend
    const topicData = {
      topicName: data.topicName,
      chapterId: data.chapterId,
      pdfUrl: cloudinaryResult.secure_url,
      isActive: data.isActive,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/create-with-url`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        // 'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicData),
    });

    if (!response.ok) {
      // If backend fails, try to delete the uploaded file from Cloudinary
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cloudinary/delete-file`, {
          method: 'POST',
          credentials: 'include',
          headers: { 
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ publicId: `${folder}/${publicId}` }),
        });
      } catch (deleteError) {
        console.error('Failed to cleanup Cloudinary file:', deleteError);
      }
      
      const errorData = await response.json().catch(() => null);
      throw new Error(`Failed to save topic: ${errorData?.message || response.statusText}`);
    }

    // Manually refresh the page or invalidate queries since we can't use revalidatePath
    if (typeof window !== 'undefined') {
      window.location.reload(); // Or use your state management to refresh data
    }
    
  } catch (error) {
    console.error('Error uploading notes:', error);
    throw error;
  }
}
