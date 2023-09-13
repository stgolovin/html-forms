document.addEventListener("DOMContentLoaded", function () {

    for (const checkBox of document.getElementsByClassName('interest__check')) {
    checkBox.addEventListener('change', function() {
        changeChildBoxes(this);
        changeParentBoxes(this);
    })
    }

    const changeChildBoxes = checkBox => {
    for (const childBox of checkBox.closest('li').querySelectorAll('.interest__check')) {
        childBox.indeterminate = false;
        childBox.checked = checkBox.checked;
    }
    }

    const changeParentBoxes = checkBox => {
    const boxGroup = checkBox.closest('ul');
    const parentContainer = boxGroup.closest('li');
    if (!parentContainer)
        return;  
    
    const parentBox = parentContainer.querySelector('.interest__check');
    const flags = {checked: false, unchecked: false, indeterminate: false};
    
    for (const box of boxGroup.querySelectorAll('.interest__check')) {
        if (box.indeterminate) {
        flags.indeterminate = true;  
        break;      
        }
        flags.checked |= box.checked;
        flags.unchecked |= !box.checked;
        if (flags.checked && flags.unchecked) {
        flags.indeterminate = true;  
        break;            
        }
    }
    
    parentBox.indeterminate = flags.indeterminate;
    if (!flags.indeterminate) 
        parentBox.checked = flags.checked; 
    
    changeParentBoxes(parentBox);
    }
})