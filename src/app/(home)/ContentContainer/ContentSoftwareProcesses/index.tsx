import {InfoBox} from "@src/components/InfoBox";

const ContentSoftwareProcesses = () => {
    return (
        <InfoBox img="/img/home_software_processes_card.png" title="Software Development Processes">
            <section className="flex flex-col gap-2">
                <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange">Streamlined Software Development Processes</h2>
                <p>At CraftScript, we uphold a commitment to excellence in software development processes, ensuring the delivery of high-quality solutions that exceed client expectations. Our approach is rooted in agile methodologies, enabling us to adapt to changing requirements and deliver value iteratively.</p>
                <p>With a focus on agile management and sprint-based development, we embrace a collaborative and iterative approach to project execution. Our dedicated teams work closely with clients to define clear objectives, prioritize tasks, and deliver tangible results within each sprint cycle.</p>
                <p>Our development process adheres to a meticulous workflow, spanning various stages from initial development to release. This includes comprehensive testing methodologies covering all aspects of the development lifecycle, beginning with unit tests and progressing to integration tests and end-to-end tests. Through rigorous testing practices, including regression testing and automation testing, we guarantee the reliability, scalability, and performance of our solutions.</p>
            </section>
        </InfoBox>
    );
}

export default ContentSoftwareProcesses;
