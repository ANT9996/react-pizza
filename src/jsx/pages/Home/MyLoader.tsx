import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props: object) => (
    <ContentLoader
        speed={3}
        width={280}
        height={457}
        viewBox="0 0 280 457"
        // backgroundColor="#d1fff0"
        // foregroundColor="#fff0d1"
        backgroundColor="#F5F5F5"
        {...props}
    >
        <rect x="25" y="15" rx="5" ry="5" width="220" height="0"/>
        <rect x="0" y="310" rx="5" ry="5" width="280" height="37"/>
        <rect x="0" y="207" rx="5" ry="5" width="280" height="21"/>
        <circle cx="135" cy="108" r="88"/>
        <rect x="0" y="244" rx="5" ry="5" width="280" height="46"/>
    </ContentLoader>
)

export default MyLoader