const generateSvg = (svgContent: string) => {
    return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
}

export { generateSvg }
