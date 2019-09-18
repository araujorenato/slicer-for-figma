figma.showUI(__html__);

figma.ui.resize(240,251);

figma.ui.onmessage = msg => {

    if (msg.type === 'slicepadding') {
        const objects = figma.currentPage.selection;
        
        for (let i = 0; i < objects.length; i++) {
            let slc = figma.createSlice()

            slc.x = objects[i].x-msg.padding
            slc.y = objects[i].y-msg.padding
            slc.resize(objects[i].width+msg.padding*2, objects[i].height+msg.padding*2)
            slc.name = `${objects[i].name}`
            objects[i].parent.appendChild(slc)

            figma.currentPage.selection = [objects[i], slc];
            let group = figma.group(figma.currentPage.selection, objects[i].parent)
            group.name = `${objects[i].name}`
            figma.currentPage.selection = [group];
        }
    } else if (msg.type === 'slicesize'){
        const objects = figma.currentPage.selection;
        
        for (let i = 0; i < objects.length; i++) {
            let slc = figma.createSlice()
    
            slc.x = objects[i].x+objects[i].width/2-msg.w/2
            slc.y = objects[i].y+objects[i].height/2-msg.h/2
            slc.resize(msg.w, msg.h)
            slc.name = `${objects[i].name}`
            objects[i].parent.appendChild(slc)

            figma.currentPage.selection = [objects[i], slc];
            let group = figma.group(figma.currentPage.selection, objects[i].parent)
            group.name = `${objects[i].name}`
            figma.currentPage.selection = [group];
        }
    }

    figma.closePlugin();
};