export class FileService {
  async saveFile(file: any): Promise<string> {
    const newName = `${Date.now()}_${file.name}`;
    await file.mv(`public/products/${newName}`);
    return newName;

    // const post = await PostModel.findOne({where: {image: newName}});
    // if (post) {
    //     post.image = newName;
    //     await post.save();
    // }
  }
}
