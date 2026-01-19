// Constants for layout
const PADDING_X = 50;
const PADDING_Y = 20;
const LEVEL_OFFSET_X = 350;
const NODE_WIDTH = 280;
const NODE_HEIGHT = 40;
const FONT_SIZE = 16;
const LINE_HEIGHT = 1.2;

interface MindMapNode {
    id: string;
    text: string;
    level: number;
    children: MindMapNode[];
    x?: number;
    y?: number;
    height?: number;
}

export function generateMindMapElements(outlineText: string) {
    const lines = outlineText.split('\n');
    const nodes: MindMapNode[] = [];
    const root: MindMapNode = {
        id: 'root',
        text: 'Computer Vision Fundamentals',
        level: 0,
        children: []
    };
    nodes.push(root);

    let currentModule: MindMapNode | null = null;
    let currentSection: MindMapNode | null = null;

    // Parse the text
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith('### ')) {
            // Module (Level 1)
            const text = trimmed.replace('### ', '').replace(/\*\*/g, '').trim();
            currentModule = {
                id: `module-${Math.random().toString(36).substr(2, 9)}`,
                text,
                level: 1,
                children: []
            };
            root.children.push(currentModule);
            currentSection = null;
        } else if (trimmed.match(/^\d+\./)) {
            // Section (Level 2)
            if (!currentModule) continue;
            const text = trimmed.replace(/^\d+\./, '').replace(/\*\*/g, '').trim();
            currentSection = {
                id: `section-${Math.random().toString(36).substr(2, 9)}`,
                text,
                level: 2,
                children: []
            };
            currentModule.children.push(currentSection);
        } else if (trimmed.startsWith('*')) {
            // Detail (Level 3)
            if (!currentSection) continue;
            const text = trimmed.replace(/^\*\s+/, '').replace(/\*\*/g, '').trim();
            const detailNode: MindMapNode = {
                id: `detail-${Math.random().toString(36).substr(2, 9)}`,
                text,
                level: 3,
                children: []
            };
            currentSection.children.push(detailNode);
        }
    }

    // Calculate layout
    let currentY = 0;
    const elements: any[] = [];

    function processNode(node: MindMapNode, startX: number) {
        // Calculate height based on text roughly
        const lineCount = Math.ceil(node.text.length / 30); // Approx chars per line
        const nodeH = Math.max(NODE_HEIGHT, lineCount * FONT_SIZE * LINE_HEIGHT + 20);
        node.height = nodeH;
        
        // If leaf node, increment Y
        if (node.children.length === 0) {
            node.y = currentY;
            node.x = startX;
            currentY += nodeH + PADDING_Y;
        } else {
            // Process children first to determine parent Y
            let firstChildY = 0;
            let lastChildY = 0;
            
            node.children.forEach((child, index) => {
                processNode(child, startX + LEVEL_OFFSET_X);
                if (index === 0) firstChildY = child.y!;
                if (index === node.children.length - 1) lastChildY = child.y!;
            });

            // Center parent vertically relative to children
            node.y = (firstChildY + lastChildY) / 2;
            node.x = startX;
        }

        // Create Excalidraw Element for Node
        const elementId = node.id;
        const fontSize = node.level === 0 ? 24 : node.level === 1 ? 20 : 16;
        const bgColor = node.level === 0 ? '#e0e7ff' : node.level === 1 ? '#f3f4f6' : '#ffffff';
        const borderColor = node.level === 0 ? '#4338ca' : node.level === 1 ? '#4b5563' : '#9ca3af';

        // Rectangle
        elements.push({
            id: elementId,
            type: "rectangle",
            x: node.x,
            y: node.y,
            width: NODE_WIDTH,
            height: node.height,
            strokeColor: borderColor,
            backgroundColor: bgColor,
            fillStyle: "solid",
            strokeWidth: 1,
            strokeStyle: "solid",
            roughness: 1,
            opacity: 100,
            groupIds: [],
            roundness: { type: 3 },
            seed: Math.random() * 1000,
            version: 1,
            versionNonce: 0,
            isDeleted: false,
            boundElements: null,
            updated: Date.now(),
            link: null,
            locked: false,
        });

        // Text
        elements.push({
            id: elementId + '-text',
            type: "text",
            x: node.x + 10,
            y: node.y + 10,
            width: NODE_WIDTH - 20,
            height: node.height - 20,
            fontSize: fontSize,
            fontFamily: 1,
            text: node.text,
            textAlign: "left",
            verticalAlign: "middle",
            containerId: elementId,
            originalText: node.text,
            strokeColor: "#000000",
            backgroundColor: "transparent",
            fillStyle: "hachure",
            strokeWidth: 1,
            strokeStyle: "solid",
            roughness: 1,
            opacity: 100,
            groupIds: [],
            seed: Math.random() * 1000,
            version: 1,
            versionNonce: 0,
            isDeleted: false,
            boundElements: null,
            updated: Date.now(),
            link: null,
            locked: false,
        });

        // Edges (Arrows)
        node.children.forEach(child => {
            elements.push({
                id: `edge-${node.id}-${child.id}`,
                type: "arrow",
                x: node.x! + NODE_WIDTH,
                y: node.y! + node.height! / 2,
                width: LEVEL_OFFSET_X - NODE_WIDTH,
                height: child.y! + child.height! / 2 - (node.y! + node.height! / 2),
                strokeColor: "#9ca3af",
                backgroundColor: "transparent",
                fillStyle: "hachure",
                strokeWidth: 1,
                strokeStyle: "solid",
                roughness: 1,
                opacity: 100,
                groupIds: [],
                roundness: { type: 2 },
                seed: Math.random() * 1000,
                version: 1,
                versionNonce: 0,
                isDeleted: false,
                boundElements: null,
                updated: Date.now(),
                link: null,
                locked: false,
                points: [
                    [0, 0],
                    [(LEVEL_OFFSET_X - NODE_WIDTH) / 2, 0],
                    [(LEVEL_OFFSET_X - NODE_WIDTH) / 2, child.y! + child.height! / 2 - (node.y! + node.height! / 2)],
                    [LEVEL_OFFSET_X - NODE_WIDTH, child.y! + child.height! / 2 - (node.y! + node.height! / 2)]
                ],
                startBinding: { elementId: node.id, gap: 1 },
                endBinding: { elementId: child.id, gap: 1 },
            });
        });
    }

    processNode(root, 0);

    return elements;
}
