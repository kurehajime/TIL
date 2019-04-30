using UnityEngine;
using System.Collections;

public class Wall : MonoBehaviour
{
    public Sprite dmgSprite;                   
    public int hp = 3;
    
    
    private SpriteRenderer spriteRenderer;
    
    void Awake ()
    {
        //初期化
        spriteRenderer = GetComponent<SpriteRenderer> ();
    }
    
    
    //壁にダメージ
    public void DamageWall (int loss)
    {
        
        //ヒビを加える
        spriteRenderer.sprite = dmgSprite;
        
        hp -= loss;
        
        //HP0で破棄
        if(hp <= 0)
        {
            gameObject.SetActive(false);
        }
    }
}