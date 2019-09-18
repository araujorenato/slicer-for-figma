figma.showUI(__html__);

figma.ui.resize(320,242);

figma.ui.onmessage = msg => {

    if (msg.type === 'generate-slices') {
        const objects = figma.currentPage.selection;
        console.log(objects);
        
        for (let i = 0; i < objects.length; i++) {
            //figma.currentPage.selection = [objects[i]]

            let slc = figma.createSlice()
            console.log(slc)
            slc.x = objects[i].x-msg.padding
            slc.y = objects[i].y-msg.padding
            slc.resize(objects[i].width+msg.padding*2, objects[i].height+msg.padding*2)
            slc.name = `${objects[i].name}`
            objects[i].parent.appendChild(slc)

            figma.currentPage.selection = [objects[i], slc];
            let group = figma.group(figma.currentPage.selection, objects[i].parent)
            group.name = `${objects[i].name}`
        }
    }

    figma.closePlugin();
};
