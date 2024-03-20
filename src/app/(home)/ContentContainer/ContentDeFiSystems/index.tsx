import {InfoBox} from "@src/components/InfoBox";

const ContentDeFiSystems = () => {
    return (
        <InfoBox img="/img/home_defi_systems_card.png" title="DeFi Systems" imgPosition="right">
            <section className="flex flex-col gap-2">
                <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange">Unlocking the Potential of DeFi</h2>
                <p>Embark on a journey into the decentralized finance (DeFi) landscape with CraftScript's innovative solutions powered by Ethereum and other cutting-edge technologies. As pioneers in the realm of web3 development, we specialize in creating decentralized financial systems that redefine traditional finance.</p>
                <p>From decentralized exchanges (DEX) to automated market makers (AMM) and beyond, CraftScript's DeFi systems offer unparalleled opportunities for financial innovation and inclusivity. Harness the power of blockchain technology to revolutionize financial services and democratize access to global markets.</p>
                <p>Join the decentralized finance revolution with CraftScript's tailored DeFi solutions. Experience the future of finance today.</p>
            </section>
        </InfoBox>
    );
}

export default ContentDeFiSystems;
