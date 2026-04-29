'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ postCount:0, subscriberCount:0, messageCount:0, unreadCount:0, recentLogs:[], recentMessages:[] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats').then(r=>r.json()).then(data=>{setStats(data);setLoading(false)}).catch(()=>setLoading(false))
  }, [])

  const statCards = [
    { label:'TOTAL POSTS', value:stats.postCount, icon:'📝', href:'/admin/logs', color:'var(--cyan)' },
    { label:'SUBSCRIBERS', value:stats.subscriberCount, icon:'👥', href:'/admin/subscribers', color:'var(--green)' },
    { label:'MESSAGES', value:stats.messageCount, icon:'📬', href:'/admin/messages', color:'var(--purple)' },
    { label:'UNREAD', value:stats.unreadCount, icon:'🔔', href:'/admin/messages', color:stats.unreadCount ? 'var(--pink)' : 'var(--muted)' },
  ]

  return (
    <main style={{padding:'40px',maxWidth:'1200px',margin:'0 auto'}}>
      <div style={{marginBottom:'40px'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',letterSpacing:'4px',color:'var(--cyan)',marginBottom:'8px'}}>// ADMIN DASHBOARD</div>
        <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'2rem',fontWeight:900,letterSpacing:'-1px'}}>Welcome back, <span style={{color:'var(--cyan)'}}>Kay</span></h1>
        <p style={{color:'var(--muted)',marginTop:'6px',fontFamily:'JetBrains Mono,monospace',fontSize:'0.75rem'}}>{new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'var(--border)',marginBottom:'40px'}}>
        {statCards.map((s,i)=>(
          <Link key={i} href={s.href} style={{textDecoration:'none'}}>
            <div style={{background:'var(--bg)',padding:'30px 24px',cursor:'pointer',transition:'background 0.3s'}}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background='rgba(0,245,255,0.02)'}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background='var(--bg)'}>
              <div style={{fontSize:'1.5rem',marginBottom:'12px'}}>{s.icon}</div>
              <div style={{fontFamily:'Syne,sans-serif',fontSize:'2.5rem',fontWeight:900,color:s.color,lineHeight:1}}>{loading?'...':s.value}</div>
              <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.62rem',color:'var(--muted)',letterSpacing:'2px',marginTop:'8px'}}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{marginBottom:'40px'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',letterSpacing:'3px',color:'var(--muted)',marginBottom:'16px'}}>// QUICK ACTIONS</div>
        <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
          {[{label:'+ NEW POST',href:'/admin/logs/new',primary:true},{label:'VIEW MESSAGES',href:'/admin/messages',primary:false},{label:'SUBSCRIBERS',href:'/admin/subscribers',primary:false},{label:'ADD AI DOCUMENT',href:'/admin/documents',primary:false}].map((a,i)=>(
            <Link key={i} href={a.href} style={{textDecoration:'none'}}>
              <button style={{background:a.primary?'linear-gradient(135deg,var(--cyan),var(--cyan2))':'transparent',color:a.primary?'var(--bg)':'var(--cyan)',border:a.primary?'none':'1px solid var(--border-bright)',padding:'10px 20px',fontFamily:'JetBrains Mono,monospace',fontSize:'0.75rem',cursor:'pointer',fontWeight:a.primary?700:400,letterSpacing:'1px'}}>{a.label}</button>
            </Link>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'30px'}}>
        <div>
          <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',letterSpacing:'3px',color:'var(--muted)',marginBottom:'16px'}}>// RECENT POSTS</div>
          <div style={{border:'1px solid var(--border)'}}>
            {loading?<div style={{padding:'30px',textAlign:'center',color:'var(--muted)',fontFamily:'JetBrains Mono,monospace',fontSize:'0.72rem'}}>LOADING...</div>
            :stats.recentLogs.length>0?stats.recentLogs.map((log:any,i:number)=>(
              <Link key={log.id} href={`/admin/logs/${log.id}/edit`} style={{textDecoration:'none'}}>
                <div style={{padding:'16px 20px',borderBottom:i<stats.recentLogs.length-1?'1px solid var(--border)':'none',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',transition:'background 0.2s'}}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background='rgba(0,245,255,0.02)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background='transparent'}>
                  <div>
                    <div style={{fontSize:'0.85rem',fontWeight:600,marginBottom:'3px'}}>{log.title}</div>
                    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.62rem',color:'var(--muted)'}}>{new Date(log.created_at).toLocaleDateString('en-GB')}</div>
                  </div>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.62rem',padding:'3px 10px',border:'1px solid',borderColor:log.status==='published'?'rgba(0,255,136,0.3)':'var(--border)',color:log.status==='published'?'var(--green)':'var(--muted)'}}>{log.status.toUpperCase()}</span>
                </div>
              </Link>
            )):<div style={{padding:'30px',textAlign:'center',color:'var(--muted)',fontFamily:'JetBrains Mono,monospace',fontSize:'0.72rem'}}>No posts yet</div>}
          </div>
        </div>
        <div>
          <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',letterSpacing:'3px',color:'var(--muted)',marginBottom:'16px'}}>// RECENT MESSAGES</div>
          <div style={{border:'1px solid var(--border)'}}>
            {loading?<div style={{padding:'30px',textAlign:'center',color:'var(--muted)',fontFamily:'JetBrains Mono,monospace',fontSize:'0.72rem'}}>LOADING...</div>
            :stats.recentMessages.length>0?stats.recentMessages.map((msg:any,i:number)=>(
              <Link key={msg.id} href="/admin/messages" style={{textDecoration:'none'}}>
                <div style={{padding:'16px 20px',borderBottom:i<stats.recentMessages.length-1?'1px solid var(--border)':'none',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',background:!msg.read?'rgba(0,245,255,0.02)':'transparent',transition:'background 0.2s'}}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background='rgba(0,245,255,0.04)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background=!msg.read?'rgba(0,245,255,0.02)':'transparent'}>
                  <div>
                    <div style={{fontSize:'0.85rem',fontWeight:600,marginBottom:'3px',display:'flex',alignItems:'center',gap:'8px'}}>
                      {!msg.read&&<span style={{width:'6px',height:'6px',background:'var(--cyan)',borderRadius:'50%',display:'inline-block'}}/>}{msg.name}
                    </div>
                    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.62rem',color:'var(--muted)'}}>{msg.subject}</div>
                  </div>
                  <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.6rem',color:'var(--muted)'}}>{new Date(msg.created_at).toLocaleDateString('en-GB')}</div>
                </div>
              </Link>
            )):<div style={{padding:'30px',textAlign:'center',color:'var(--muted)',fontFamily:'JetBrains Mono,monospace',fontSize:'0.72rem'}}>No messages yet</div>}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html:`@media(max-width:900px){main{padding:20px!important;}div[style*="repeat(4"]{grid-template-columns:1fr 1fr!important;}div[style*="1fr 1fr"]{grid-template-columns:1fr!important;}}`}}/>
    </main>
  )
}
