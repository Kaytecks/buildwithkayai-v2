export default function Marquee() {
  const items = [
    { label: 'AWS', desc: 'Cloud Infrastructure' },
    { label: 'Terraform', desc: 'Infrastructure as Code' },
    { label: 'Docker · Kubernetes', desc: 'Container Orchestration' },
    { label: 'ISO 27001', desc: 'Security Compliance' },
    { label: 'Prometheus · Grafana', desc: 'Observability' },
    { label: 'CI/CD Pipelines', desc: 'Continuous Delivery' },
    { label: 'PCI DSS', desc: 'Regulatory Compliance' },
    { label: 'Cybersecurity + AI', desc: 'MSc Research' },
  ]

  // Duplicate for seamless loop
  const allItems = [...items, ...items]

  return (
    <div className="marquee-fixed">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <div key={i} className="mq-item">
            <span>{item.label}</span>
            {item.desc}
            {i < allItems.length - 1 && (
              <span style={{ color: 'var(--border-bright)', marginLeft: '25px' }}>◆</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
